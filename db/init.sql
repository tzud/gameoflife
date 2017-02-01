CREATE TABLE `patterns` (
  `pa_id` int(11) NOT NULL AUTO_INCREMENT,
  `pa_name` varchar(255) DEFAULT NULL,
  `pa_data` longtext,
  `pa_created_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`pa_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;