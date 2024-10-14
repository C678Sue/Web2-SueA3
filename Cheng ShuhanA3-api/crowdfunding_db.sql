-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主机： localhost:3306
-- 生成日期： 2024-10-12 00:47:38
-- 服务器版本： 5.7.44-cll-lve
-- PHP 版本： 8.1.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `yyang68_Web II_A3_yangyijie`
--

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

CREATE TABLE `category` (
  `CATEGORY_ID` int(11) NOT NULL,
  `NAME` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`CATEGORY_ID`, `NAME`) VALUES
(2, 'Education'),
(3, 'Environment'),
(4, 'Medical Assistance'),
(5, 'Animals / Pets'),
(6, 'Natural Disasters');

-- --------------------------------------------------------

--
-- 表的结构 `donation`
--

CREATE TABLE `donation` (
  `DONATION_ID` int(11) NOT NULL,
  `DATE` datetime NOT NULL,
  `AMOUNT` decimal(10,2) NOT NULL,
  `GIVER` varchar(255) NOT NULL,
  `FUNDRAISER_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `donation`
--

INSERT INTO `donation` (`DONATION_ID`, `DATE`, `AMOUNT`, `GIVER`, `FUNDRAISER_ID`) VALUES
(1, '2024-10-07 14:51:21', 1000.00, 'Anonymous Giver', 1),
(2, '2024-10-04 18:53:28', 2000.00, 'Mandy Walsh', 2),
(3, '2024-10-09 12:56:08', 1000.00, 'Kelly and Ray', 3),
(4, '2024-10-09 12:56:24', 3000.00, 'Wagging Tails\r\n', 4),
(5, '2024-10-09 12:56:42', 3000.00, 'Brent and Jan\r\n', 5),
(6, '2024-10-07 14:51:21', 1000.00, 'Lauren Niles', 6),
(7, '2024-10-08 18:53:28', 2000.00, 'Anonymous', 7),
(8, '2024-10-09 12:56:08', 1000.00, 'Marie and Brody', 8),
(9, '2024-10-09 12:32:24', 3000.00, 'Nick and Laura', 9),
(10, '2024-10-09 12:28:42', 5000.00, 'Grandma and Papa McKillip', 10),
(15, '2024-10-11 05:37:30', 40000.00, 'Andre Henriques', 6),
(16, '2024-10-11 05:40:12', 44000.00, 'Sophia Swann', 6),
(17, '2024-10-11 14:15:16', 8.00, 'Yoga', 3),
(18, '2024-10-11 23:07:39', 200.00, 'Grosvenor', 1);

-- --------------------------------------------------------

--
-- 表的结构 `fundraiser`
--

CREATE TABLE `fundraiser` (
  `FUNDRAISER_ID` int(11) NOT NULL,
  `ORGANIZER` varchar(100) NOT NULL,
  `CAPTION` varchar(255) NOT NULL,
  `TARGET_FUNDING` decimal(10,2) NOT NULL,
  `CURRENT_FUNDING` decimal(10,2) DEFAULT '0.00',
  `CITY` varchar(100) DEFAULT NULL,
  `ACTIVE` tinyint(1) DEFAULT '1',
  `CATEGORY_ID` int(11) DEFAULT NULL,
  `DESCRIPTION` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC;

--
-- 转存表中的数据 `fundraiser`
--

INSERT INTO `fundraiser` (`FUNDRAISER_ID`, `ORGANIZER`, `CAPTION`, `TARGET_FUNDING`, `CURRENT_FUNDING`, `CITY`, `ACTIVE`, `CATEGORY_ID`, `DESCRIPTION`) VALUES
(1, 'Alice', '2024 Hurricane Relief Fund', 5000.00, 1200.00, 'New York', 1, 6, '<p>Imagine the devastation of having your home and community torn apart by a hurricane. With several hurricanes expected this season, the 2024 Hurricane Relief Fund by RiseTogether Charities is here to provide critical financial relief to those affected.</p>\n\n      <p>As part of our Care & Relief fund, 100% of your donation goes directly to those in need, with RiseTogether.com covering all Stripe processing fees. All donations are tax-deductible and will be distributed as grants to campaigns hosted on RiseTogether.com.</p>\n\n      <p>If you or someone you know has been impacted by these hurricanes, we encourage you to start a campaign on RiseTogether.com and apply for a grant on our website RiseTogether.org.</p>\n\n      <p>Your generous support can bring hope and relief to those facing this devastating reality. Join us in making a difference. Donate now to help hurricane victims rebuild their lives.</p>'),
(2, 'Rhoda Laguerre', 'Relief for Helene Survivors', 3000.00, 2000.00, 'Sacramento', 1, 6, '<p>We\'ve all seen the absolute destruction from hurricane Helene!! It absolutely Breaks my heart to hear of so many losing their homes so quickly! </p>\n<p>My heart is heavy for all those who\'ve lost so much! There\'s no way we can take away their pain and grief at the loss but we can lift their hands, and ask God to speak peace .</p>\n<p>Would you like to help us support those who may have lost everything familiar?</p>\n<p> My cousin Joe is headed up to the hills of NC to help with cleanup and emergency care so we are able to send items with him to put them right in the hands of the people who need them. </p>\n <p> With the help of all of you, LGS is in a unique position to be able to help those survived during disasters. 🏥 Our safe shampoos, balms,and soaps are definite essentials!</p>\n<p>  I\'ll be using whatever your gift of support is, to purchase hygiene products that help survivors feel a bit more loved, when they have no idea where to start. Finding basic necessities, and having Joe deliver them to the needy ones as they rebuild will help them know we are behind them supporting them, even though far away!</p>\n<p> Please continue to pray with us,</p>\n<p> Felix, Rhoda, and family</p>'),
(3, 'Tony Sisule', 'Elderly assisitive medical & psychological care', 2000.00, 1008.00, 'East Brunswick', 1, 4, '<p>A lot of elderly people in Kenya are confronted with impossible odds. A majority grow old with no pension due to unemployment, low incomes, and disability in their younger days. As they get older, children and relations may be in distant cities working and the elderly people live alone.</p>\n<p>They become poorer as they age just as the costs of medical care go sky-high and they lack insurance but have to face diabetes, heart conditions, arthritis, cognitive impairments, dementia and other ailments. Costs to travel to hospitals, get a diagnosis, receive treatment or undergo surgery are extremely high in Kenya, especially in Busia County, which has inadequately equipped health facilities. The nearest hospitals with better facilities are in either Eldoret, 100 miles away, or Kisumu 70 miles away. Most of the aged people cannot afford the costs of these facilities.</p>\n<p>Even if they made it to a private or government hospital, most elderly people have no health insurance or hold the government provided insurance that provides only basic outpatient cover and very limited payments for treatment, surgery and hospital stays. Some above 70 years of age receive a government cash transfer of Kshs 2,000 (US$ 15) per month that can barely purchase a few meals and is not enough to meet costs of medical care. For elders with disabilities, assistive devices such as hearing aids, eyeglasses, canes, walking frames and wheelchairs are unaffordable. They live in the dilemma of lacking independence due to disability but have nobody to assist them in their lonely lives. As a result, elders live lonely and sickly lives of pain with untreated ailments.</p>\n<p>We have already provided land for this elder care service with water supply, electricity, storage facilities and a building to administer the service located close to the Secondary School on the Nambale to Busibwabo Road.</p>\n<p>Funds raised from this campaign will be used to set up a service for elderly people in Nambale town in Busia County of Kenya, which will provide them with:</p>\n<p>(1) Regular medical diagnostic checks by local health staff and volunteer medics so they can be assisted with treatment or referral to hospitals for timely care.</p>\n<p>(2) Eye glasses, hearing aids, walking frames, wheelchairs and other disability assistive devices.</p>\n<p>(3) A communal facility with loving care and company to reduce loneliness and improve their psychological conditions.</p>\n<p>(4) A food bank to feed elderly people.</p>'),
(4, 'Temika Levasseur', 'Emergency Help for Callie', 4000.00, 3000.00, 'Madawaska', 1, 5, '<p>Hello and thank you in advance for reading. Today September 15th, my wife’s dog Callie was seriously injured, of course on her birthday. We believe she has a broken jaw and are headed downstate to the Eastern Maine Vet Clinic in Brewer as the suggestion of an online vet. We are not ones to ask for help but would appreciate all the help we can get. Just like everyone keeping our heads above water is difficult but we don’t have the extra funds for such a large injury at the current time. There is no amount that is too little and if all you can do is pray… we appreciate that too! As groomers and rescuers, we have given our lives to animals and hate to see them suffer but will do everything in our power to ensure our fur babies are okay. Thank you so much in advance for all help and prayers 💗</p>'),
(5, 'Eve', 'Restore and Rebuild the Frazier Family', 6000.00, 3000.00, 'Miami', 1, 6, '<p>Please join me in lending a gracious hand to my cousin, Lucas Frazier and his wife, Alex. They were able to escape from their home in the middle of a massive mudslide just outside of Asheville, NC. Although Asheville had made preparations for rising waters in town, I don’t think a mudslide/landslide ever cross anyone’s minds! Lucas and Alex’s house was swept off of its foundation and traveled a great distance before crashing into another home. </p>\n\n      <p> Alex suffered a severe cut on her ankle as they were escaping thru a window of their home and had to be taken to a local hospital via helicopter. Lucas had to stay behind and had no communication with his wife for two days & two nights. Eventually, they ended up in different shelters for the remainder of the weekend.</p>\n\n      <p>This family lost everything they owned in the mudslide, including their vehicles & Lucas’ tools, with which he makes a living. Thankfully, by the grace of God, they were able to escape the situation. They are now being taken into my Aunt and Uncles home in Rockwell, NC. They are still trying to process this whole experience, but the bottom line is that all they had just a few days ago… is now gone.</p>\n\n      <p>Please join me in giving, so that this beautiful family can start rebuilding their future together.</p>\n      <p>Thank you in advance and God Bless! </p>\n\n     '),
(6, 'Roche Beran', 'Help Us Build a Clinic in Palawan', 89600.00, 85000.00, 'Cebu City', 1, 4, '<p>Help us raise $1.6M to build the first-ever medical clinic for 5,000+ people in Tumarbong, Palawan. Your gift will provide life-saving healthcare to a community with no nearby medical services!</p>'),
(7, 'MD AL DOHA RABE PAYEL', 'Supporting for higher education', 30000.00, 2000.00, 'Dhaka', 1, 2, '<p>In a small, quiet village by the Narsundha River, far from the hustle and bustle of Kishoreganj town, I run a simple chamber as a village doctor. The wooden benches outside often fill up quickly with villagers seeking treatment for their ailments. They come to me because they trust me, and because I am their only hope. Many can’t afford the expensive care in the town’s hospitals, and the nearest clinic is hours away.</p>\n<p>Every day, I do my best with the little I have—some basic medicines, a stethoscope, and my training. Most of the time, I can manage the common cases—fevers, coughs, cuts, and wounds. But there are moments that shake me, moments that remind me how much more I need to truly serve my people.</p>\n<p>One such moment came when a farmer brought his elderly mother to my chamber. She had been complaining of chest pain and shortness of breath for days. As I examined her, it was clear that her condition was serious—likely a heart problem. But I didn’t have the tools or the specialized knowledge to treat her properly. I gave her some medicine to ease the pain and urged them to go to the town hospital. Yet I knew, as I looked into the farmer’s worried eyes, that they couldn’t afford the journey or the expensive treatment that awaited them.</p>\n<p>This is the reality I face every day. Born and raised in this village, I know the struggles of these people firsthand. My family, too, once relied on the kindness of others for basic needs. I worked hard to become a general physician, studying diligently so that I could return and serve those who needed me most. But now, after years of running my chamber, I’ve come to realize that my education isn’t enough. The health problems in this village are more complex than I had imagined. Every day, I face cases that require specialized treatment—treatment I can’t provide because I haven’t had the chance to pursue higher education.</p>\n<p>I dream of becoming more than just a village doctor. With advanced training, I could diagnose and treat conditions like heart disease, diabetes, or respiratory problems—diseases that claim lives here simply because people can’t afford to go elsewhere. But the cost of pursuing further studies is overwhelming. My earnings from this small chamber are barely enough to support my family, let alone pay for advanced education. And yet, I can’t shake the feeling that my people deserve better care, that I owe it to them to learn more.</p>\n<p>Every day I sit in my chamber, watching the villagers file in, each with their own story of struggle. And every day, I hold on to the hope that one day I will find the means to continue my education, not for my own gain, but for them—for the people who need more than I can currently give.</p>'),
(8, 'Brooke Wynn', 'Recovery After Fire: Supporting Jamie & Her Family', 10000.00, 1000.00, 'Edmond', 1, 6, '<p>Our sister Jamie Opp (soon to be Taylor) requested prayer this Wednesday when she was unable to attend small group at Sisterhood. But, I have a feeling with Gods help we can do MORE than that! Jamie and her large family of 7 kids had a fire in their home isolated to their kitchen. Thankfully everyone is safe! Just some minor burns. But they have some pressing needs. We have the opportunity, the honor, and the responsibility to get to help! There are many ways to help. You can pray, donate funds, gift cards, kitchen items, or assist with some of their needs through serving. </p>\n<ul><li>*Kitchen Items Needed: Microwave, air fryer, plates, bowls, cups.</li>\n<li>**Grocery Need: Funds, Walmart giftcards, or Groceries. Specifically in need of groceries that can make meals without a range or microwave. </li>\n<li>Service Need: Truck & moving assistance - a family member has donated a range and they need assistance with pick up, delivery and installation of the new range.</li>\n<li>Service Need: Electrical assistance - The outlets in the kitchen are not working and need repair. </li>\n</ul>\n<p>The Taylor family is new to our church family, and I know our support in prayer and/or any gifts or donations you can provide will be a huge blessing! When Jamie originally reached out after the fire she only asked for prayer. But, “WE’RE FAMILY.” I knew together we could do more, so I requested all this information and compiled lists of needs. Looking forward to hearing the “God did it” testimonies to come from this! </p>\n<p>*Kitchen items do not have to be brand new! If you have things you\'d like to donate from your home it would be welcomed and I\'ll arrange pick up and delivery. </p>\n<p>**If you prefer to donate actual groceries please coordinate with me so we can coordinate pick up and delivery. </p>'),
(9, 'Roger Whitford', 'Mark P. Whitford Scholarship Fund', 10000.00, 3000.00, 'Lewes', 1, 2, '<p>Mark P. Whitford was one of the unfortunate heroes that lost his life on that tragic day September 11th 2001. Mark was a firefighter with Engine Company 23. Mark attended and graduated from Tottenville High School in Staten Island, NY. During his time at Tottenville High Mark developed a passion for wrestling. He was a three time NYC Champion and plaed 6th in NY State his senior year. Mark went on to wrestle for Seton Hall University, where he became a Division 1 National qualifier, and in 2002 was inducted into the National Wrestling Hall of Fame. Like many before him, Mark valiantly gave his life so others can live theirs. While all gave some, Mark gave all. That was the type of man Mark was, always sacrificing for others. Mark left behind a wife, twin boys, and a family that misses him tremendously. In order to keep Mark\'s passion for life alive and willingness to help others his family established the Mark P. Whitford Scholarship Fund. Each year Mark\'s family provides scholarships for Tottenville High School student athletes looking to pursue higher education. In 2022 the newly built Tottenvile High School Wrestling Room was named in Mark\'s honor.</p>'),
(10, 'Christopher StLeger', 'Save Nueces Park: Plant New Cedar Elm Trees', 50000.00, 5000.00, 'Lockhart, TX', 1, 3, '<p>Hi y\'all. Most of you who live in Lockhart know that Nueces Park is one of Lockhart\'s prettiest parks. It is one of the only parks that is shaded by numerous Pecan trees. But they are not only dropping limbs left and right - very dangerous - they are falling over dead. I believe we have lost 4 in the last three years. At this rate the park will lose them all within the next decade.</p>\n<p>I\'d like to raise enough money to purchase and plant 5-6 (or more depending on what we raise) cedar elm trees. The cedar elm is a hardy and attractive species common to Lockhart, and the Texas winter is the best time to plant new trees. Our Parks Department reported that they will plant the trees and water them as well. But to make sure this happens, I need your help.</p>'),
(11, 'Run Wild Inc', 'Preserve Verkeerderkill Falls with Run Wild', 200000.00, 0.00, 'Wallkill', 1, 3, '<p>Run Wild is working with the Open Space Institute (OSI) to preserve one of New York’s iconic natural features – Verkeerderkill Falls.\n</p>\n<p>This beautiful waterfall pours off a mountain ledge nearly 2,000 feet above the Hudson Valley and plunges 187 feet into a basin of hemlocks. Welcome to one of the most spectacular sites in the Northern Shawangunk Mountains, located near the town of New Paltz, just a two-hour drive north of New York City. The Shawangunks (or “Gunks” for short) are a magical environment which the Nature Conservancy has proclaimed as “one of Earth’s last great places.”</p>\n<p>For many years, the land underlying the falls has been held in private hands. Recently, OSI negotiated an option to purchase 122 acres containing the falls, with the plan to convey the land to the State of New York for permanent protection as part of Minnewaska State Park Preserve.</p>\n<p>To exercise the option requires $500,000, which must be raised before November 30, 2025, at which point the option will expire. To ensure the falls are permanently protected, Run Wild has reserved $50,000 from its mission funds to contribute to this important cause and has embarked upon a fundraising campaign to raise an additional $150,000. We believe that the State of New York will cover the remaining balance.</p>\n<p>New York is a conservation success story, thanks to countless campaigns like this one over many, many years. You can be part of this movement. You can help preserve our natural environment for the next generation.</p>\n<p>Please join us in preserving the falls!</p>\n<p>Run Wild is a New York State not-for-profit and 501(c)3 whose mission is to support land conservation and stewardship in the Hudson Valley by leveraging the enthusiasm of the running community. As of August 2024, we have contributed just over $130,000 to this mission from the proceeds of races we organize and other fundraising. For more information, visit us at www.runwildhv.org\n</p>\n<p>Note: 100% of your contribution will go to this campaign. We will not use any of your contribution to cover expenses. If we raise more funds than are necessary to exercise the option, or in the event that the option is not exercised for reasons outside of our control, we will retain the funds contributed for future land conservation and stewardship opportunities in the Hudson Valley.</p>');

--
-- 转储表的索引
--

--
-- 表的索引 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CATEGORY_ID`) USING BTREE;

--
-- 表的索引 `donation`
--
ALTER TABLE `donation`
  ADD PRIMARY KEY (`DONATION_ID`) USING BTREE,
  ADD KEY `FUNDRAISER_ID` (`FUNDRAISER_ID`) USING BTREE;

--
-- 表的索引 `fundraiser`
--
ALTER TABLE `fundraiser`
  ADD PRIMARY KEY (`FUNDRAISER_ID`) USING BTREE,
  ADD KEY `CATEGORY_ID` (`CATEGORY_ID`) USING BTREE;

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `category`
--
ALTER TABLE `category`
  MODIFY `CATEGORY_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用表AUTO_INCREMENT `donation`
--
ALTER TABLE `donation`
  MODIFY `DONATION_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- 使用表AUTO_INCREMENT `fundraiser`
--
ALTER TABLE `fundraiser`
  MODIFY `FUNDRAISER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 限制导出的表
--

--
-- 限制表 `donation`
--
ALTER TABLE `donation`
  ADD CONSTRAINT `donation_ibfk_1` FOREIGN KEY (`FUNDRAISER_ID`) REFERENCES `fundraiser` (`FUNDRAISER_ID`);

--
-- 限制表 `fundraiser`
--
ALTER TABLE `fundraiser`
  ADD CONSTRAINT `fundraiser_ibfk_1` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `category` (`CATEGORY_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
