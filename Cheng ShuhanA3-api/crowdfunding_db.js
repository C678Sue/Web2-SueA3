const mysql = require('mysql2')
const express = require('express')
const cors = require('cors')
const app = express()
// Default port number
const port = 3091

app.use(express.json())
// Cross-domain prevention
app.use(cors())

// Configuring database parameters
const connection = mysql.createConnection({
  host: 'localhost', // Database ip
  user: 'yyang68', // Database user name
  password: 'Yifei030816@@', //'777486YYY', // Database password
  database: 'yyang68_Web II_A3_yangyijie', // Database Name
})

// Linked database
connection.connect(err => {
  if (err) {
    console.log('数据库连接失败: ' + err.stack)
    return
  }
  console.log('数据库连接成功！')
})

// Get a list of fundraisers
app.get('/fundraisers', (req, res) => {
  const query = `
        SELECT f.*, c.NAME AS CATEGORY_NAME
        FROM fundraiser f
        JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
        ORDER BY FUNDRAISER_ID;
    `
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(results)
  })
})

// Get a list of fundraisers according to the conditions:organizer, city, catagoryId
app.get('/search', (req, res) => {
  const params = []
  const organizerCondition = req.query.organizer !== null && req.query.organizer !== undefined && req.query.organizer !== '' ? `f.ORGANIZER = ?` : ''
  const cityCondition = req.query.city !== null && req.query.city !== undefined && req.query.city !== '' ? `f.CITY = ?` : ''
  const categoryCondition = req.query.categoryId !== null && req.query.categoryId !== undefined && req.query.categoryId !== '' ? `f.CATEGORY_ID = ?` : ''
  const captionCondition = req.query.caption !== null && req.query.caption !== undefined && req.query.caption !== '' ? `f.CAPTION = ?` : ''
  const currentFundingCondition =
    req.query.currentFunding !== null && req.query.currentFunding !== undefined && req.query.currentFunding !== '' ? `f.CURRENT_FUNDING = ?` : ''
  const targetFinancingCondition =
    req.query.targetFinancing !== null && req.query.targetFinancing !== undefined && req.query.targetFinancing !== '' ? `f.TARGET_FUNDING = ?` : ''
  const selectedRadioCondition =
    req.query.selectedRadio !== null && req.query.selectedRadio !== undefined && req.query.selectedRadio !== '' ? `f.ACTIVE = ?` : ''
  // Filter out parameters that are not passed in
  const conditions = [
    organizerCondition,
    cityCondition,
    categoryCondition,
    captionCondition,
    currentFundingCondition,
    targetFinancingCondition,
    selectedRadioCondition,
  ].filter(Boolean)
  const query = `
  SELECT f.*, c.NAME AS CATEGORY_NAME
  FROM fundraiser f
  JOIN category c ON f.CATEGORY_ID = c.CATEGORY_ID
  ${conditions.length > 0 ? 'WHERE ' + conditions.join(' AND ') : ''}
  `.trim()

  // Add the corresponding parameters
  if (req.query.organizer !== null && req.query.organizer !== undefined && req.query.organizer !== '') params.push(req.query.organizer)
  if (req.query.city !== null && req.query.city !== undefined && req.query.city !== '') params.push(req.query.city)
  if (req.query.categoryId !== null && req.query.categoryId !== undefined && req.query.categoryId !== '') params.push(req.query.categoryId)
  if (req.query.caption !== null && req.query.caption !== undefined && req.query.caption !== '') params.push(req.query.caption)
  if (req.query.currentFunding !== null && req.query.currentFunding !== undefined && req.query.currentFunding !== '') params.push(req.query.currentFunding)
  if (req.query.targetFinancing !== null && req.query.targetFinancing !== undefined && req.query.targetFinancing !== '') params.push(req.query.targetFinancing)
  if (req.query.selectedRadio !== null && req.query.selectedRadio !== undefined && req.query.selectedRadio !== '') params.push(Number(req.query.selectedRadio))

  connection.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(results)
  })
})

// Get all categories
app.get('/categories', (req, res) => {
  connection.query('SELECT * FROM category', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    res.json(results)
  })
})

// Get the details based on the ID
app.get('/fundraiser/:id', (req, res) => {
  const fundraiserId = req.params.id
  const query = `
        SELECT 
            f.*, 
            c.NAME AS CATEGORY_NAME
        FROM 
            fundraiser f
        JOIN 
            category c ON f.CATEGORY_ID = c.CATEGORY_ID
        WHERE 
            f.FUNDRAISER_ID = ?;

    `
  connection.query(query, [fundraiserId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    if (results.length === 0) {
      return res.status(404).json({ message: '查询数据不存在' })
    }
    const data = results[0]
    //查询关联表所有捐赠人信息
    const donateQuery = `SELECT *, DATE_FORMAT(DATE, '%Y-%m-%d %H:%i:%s') AS formatted_date FROM donation WHERE FUNDRAISER_ID = ? ORDER BY DATE DESC;`
    connection.query(donateQuery, [data.FUNDRAISER_ID], (error, donateResults) => {
      if (error) return res.status(500).json({ message: error.message })
      data.donates = donateResults
      res.json(data)
    })
  })
})

// 创建PUT方法，根据给定的ID更新现有的筹款人。
app.put('/fundraiser/:id', async (req, res) => {
  const fundraiserId = req.params.id
  if (fundraiserId === undefined || fundraiserId === null) return res.status(400).json({ message: 'lack id parameter' })
  const { ORGANIZER, CAPTION, TARGET_FUNDING, CITY, ACTIVE, CATEGORY_ID, DESCRIPTION } = req.body
  const updates = ['ORGANIZER = ?', 'CAPTION = ?', 'TARGET_FUNDING = ?', 'CITY = ?', 'ACTIVE = ?', 'CATEGORY_ID = ?', 'DESCRIPTION = ?']
  const values = [ORGANIZER, CAPTION, Number(TARGET_FUNDING), CITY, Number(ACTIVE), Number(CATEGORY_ID), DESCRIPTION]
  if (updates.length === 0) {
    return res.status(400).json({ message: 'No update field is provided' })
  }
  const query = `
      UPDATE fundraiser
      SET ${updates.join(', ')}
      WHERE FUNDRAISER_ID = ?
  `
  values.push(Number(fundraiserId))
  connection.execute(query, values, err => {
    if (!err) {
      res.status(200).json({ message: '筹款者信息更新成功' })
    } else {
      res.status(500).json({ message: err.message })
    }
  })
})

// 添加新的捐赠信息
app.post('/donation', (req, res) => {
  const { AMOUNT, GIVER, FUNDRAISER_ID } = req.body
  if (AMOUNT === null) return res.status(400).json({ message: 'The amount is required' })
  if (GIVER === null) return res.status(400).json({ message: 'The giver is required' })
  if (FUNDRAISER_ID === null) return res.status(400).json({ message: 'The FUNDRAISER ID is required' })
  const date = new Date()
  const query = 'INSERT INTO donation (DATE, AMOUNT, GIVER, FUNDRAISER_ID) VALUES (?, ?, ?, ?)'
  connection.query(query, [date, Number(AMOUNT), GIVER, Number(FUNDRAISER_ID)], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    try {
      // 更新筹款人筹集当前资金
      const sql = 'UPDATE fundraiser SET CURRENT_FUNDING = CURRENT_FUNDING + ? WHERE FUNDRAISER_ID = ?'
      await connection.execute(sql, [AMOUNT, FUNDRAISER_ID])
      res.status(200).json({ message: '添加成功' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })
})

// 创建POST方法将新的筹款人插入数据库。
app.post('/fundraiser', (req, res) => {
  const { ORGANIZER, CAPTION, TARGET_FUNDING, CITY, ACTIVE, CATEGORY_ID, DESCRIPTION } = req.body
  if (ORGANIZER === null) return res.status(400).json({ message: 'lack ORGANIZER parameter' })
  if (CAPTION === null) return res.status(400).json({ message: 'lack CAPTION parameter' })
  if (TARGET_FUNDING === null) return res.status(400).json({ message: 'lack TARGET_FUNDING parameter' })
  if (CITY === null) return res.status(400).json({ message: 'lack CITY parameter' })
  if (ACTIVE === null) return res.status(400).json({ message: 'lack ACTIVE parameter' })
  if (CATEGORY_ID === null) return res.status(400).json({ message: 'lack CATEGORY_ID parameter' })
  if (Number(TARGET_FUNDING) < 1) return res.status(400).json({ message: "TARGET_FUNDING Can't be less than 1" })
  const query = 'INSERT INTO fundraiser (ORGANIZER, CAPTION, TARGET_FUNDING, CITY, ACTIVE, CATEGORY_ID, DESCRIPTION) VALUES (?, ?, ?, ?, ?, ?, ?)'
  connection.query(query, [ORGANIZER, CAPTION, TARGET_FUNDING, CITY, ACTIVE, CATEGORY_ID, DESCRIPTION], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.status(200).json({ message: 'New success', fundraiserId: results.insertId })
  })
})

//创建DELETE方法删除基于给定ID的现有筹款人。只有尚未收到捐款的筹款人才能被删除。否则，就违背了数据完整性的概念。
app.delete('/fundraiser/:id', (req, res) => {
  const fundraiserId = req.params.id
  const checkQuery = 'SELECT COUNT(*) AS donations FROM donation WHERE FUNDRAISER_ID = ?'
  connection.query(checkQuery, [fundraiserId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    if (results[0].donations > 0) {
      return res.status(400).json({ message: 'You cannot delete fundraiser with donations' })
    }
    const deleteQuery = 'DELETE FROM fundraiser WHERE FUNDRAISER_ID = ?'
    connection.query(deleteQuery, [fundraiserId], err => {
      if (err) return res.status(500).json({ error: err.message })
      res.status(200).json({ message: 'successfully delete' })
    })
  })
})

// Database startup
app.listen(port, () => {
  console.log('启动成功：' + `http://localhost:${port}`)
})
