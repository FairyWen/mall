/*
Navicat MySQL Data Transfer

Source Server         : mysql-FairyWen
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : mall

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2019-09-07 10:27:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `address`
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '地址表',
  `user_account` varchar(255) NOT NULL COMMENT '当前用户',
  `receiveperson` varchar(255) DEFAULT NULL COMMENT '收货人',
  `receivephone` varchar(255) DEFAULT NULL COMMENT '收货人手机号',
  `address` varchar(255) DEFAULT NULL COMMENT '地址',
  `detailaddress` varchar(255) DEFAULT NULL COMMENT '具体地址',
  `uid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_account`),
  KEY `fk_address` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('11', '111111', '文梦月小可爱', '13567893098', '内蒙古自治区 通辽市 科尔沁左翼后旗', '长沙岳麓区橘子洲街道湖南大学天马学生公寓2区2栋520', null);
INSERT INTO `address` VALUES ('14', '111111', '123456', '12345678901', '北京市 市辖区 丰台区', '我是最新新增具体地址', null);
INSERT INTO `address` VALUES ('21', '文可爱', '文可爱', '18111287382', '吉林省 辽源市 东辽县', '我是具体地址', null);
INSERT INTO `address` VALUES ('26', '巴拉巴拉', '文可爱', '182882828282', '河北省 秦皇岛市 北戴河区', '我是具体地址', null);
INSERT INTO `address` VALUES ('27', '巴拉巴拉', '文可爱', '182882828282', '河北省 秦皇岛市 北戴河区', '我是具体地址', null);
INSERT INTO `address` VALUES ('28', '文可爱', '文可爱', '18122838299', '湖南省 长沙市 岳麓区', '湖南大学天马学生公寓二区二栋520', null);
INSERT INTO `address` VALUES ('29', '文可爱', '曾哥', '13567892034', '福建省 厦门市 思明区', '瑞幸咖啡', null);
INSERT INTO `address` VALUES ('43', '文可爱', '222222', '333333', '天津市 市辖区 河东区', '111111', null);
INSERT INTO `address` VALUES ('44', '文可爱', '李大猪', '15326378293', '河北省 秦皇岛市 北戴河区', '李大猪家', null);
INSERT INTO `address` VALUES ('45', '文可爱', '我是收货人', '123232323', '河北省 秦皇岛市 北戴河区', '啊啦啦啦啦啦啦啦', null);
INSERT INTO `address` VALUES ('46', '日日日', '新用户', '13526738920', '广东省 珠海市 斗门区', '我是新注册的用户的新增地址', null);
INSERT INTO `address` VALUES ('47', '日日日', '啦啦啦', '18111672833', '河北省 秦皇岛市 北戴河区', '具体地址', null);
INSERT INTO `address` VALUES ('48', '啦啦啦', '文可爱', '18111266366', '内蒙古自治区 通辽市 库伦旗', '我是具体地址', null);
INSERT INTO `address` VALUES ('50', 'Vampire', '李', '17629275475', '陕西省 西安市 长安区', '沣西新城', null);
INSERT INTO `address` VALUES ('51', '11111', '111', '111', '山西省 朔州市 右玉县', '厦门', null);
INSERT INTO `address` VALUES ('52', '账号', '文可爱', '18277237388', '山西省 长治市 襄垣县', '我是具体地址', null);
INSERT INTO `address` VALUES ('54', '曾哥', '李小二', '16273827362', '北京市 市辖区 东城区', 'lalallal', null);

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员id',
  `account` varchar(255) NOT NULL COMMENT '管理员账号',
  `password` varchar(255) NOT NULL COMMENT '管理员密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', '1号管理员', '123456');
INSERT INTO `admin` VALUES ('2', '2号管理员', '123456');

-- ----------------------------
-- Table structure for `orderlist`
-- ----------------------------
DROP TABLE IF EXISTS `orderlist`;
CREATE TABLE `orderlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `uid` int(11) DEFAULT NULL,
  `account` varchar(255) DEFAULT NULL COMMENT '创建订单的用户',
  `address` varchar(255) DEFAULT NULL COMMENT '收货地址',
  `receivephone` varchar(255) DEFAULT NULL COMMENT '接收人电话',
  `receiveperson` varchar(255) DEFAULT NULL COMMENT '接收人地址',
  `total` float DEFAULT NULL,
  `idealistictotal` float DEFAULT NULL COMMENT '理想状态下付款多少钱（不算折扣）',
  `state` int(11) NOT NULL DEFAULT '1' COMMENT '订单状态',
  `reminder` int(11) NOT NULL DEFAULT '0' COMMENT '是否催单',
  `checked` int(1) DEFAULT NULL COMMENT '是否使用了积分优惠',
  `thisdiscountintegral` int(11) DEFAULT '0' COMMENT '此订单可兑换优惠的积分（但用户不一定使用）',
  `createtime` varchar(255) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `fk_user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=209 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orderlist
-- ----------------------------
INSERT INTO `orderlist` VALUES ('104', '52', '文可爱', '吉林省 辽源市 东辽县 我是具体地址', '18111287382', '文可爱', '1110.56', null, '3', '1', null, null, '2019-08-28 13:39:43');
INSERT INTO `orderlist` VALUES ('105', '52', '文可爱', '吉林省 辽源市 东辽县 我是具体地址', '18111287382', '文可爱', '540', null, '4', '0', null, null, '2019-08-28 13:51:03');
INSERT INTO `orderlist` VALUES ('106', '52', '文可爱', '北京市 市辖区 东城区 111', '12121212', '文梦月', '920', null, '2', '1', null, null, '2019-08-28 14:03:16');
INSERT INTO `orderlist` VALUES ('107', '52', '文可爱', '吉林省 辽源市 东辽县 我是具体地址', '18111287382', '文可爱', '540', null, '3', '0', null, null, '2019-08-28 14:05:11');
INSERT INTO `orderlist` VALUES ('108', '52', '文可爱', '吉林省 辽源市 东辽县 我是具体地址', '18111287382', '文可爱', '2760', null, '4', '0', null, null, '2019-08-28 14:06:21');
INSERT INTO `orderlist` VALUES ('109', '52', '文可爱', '吉林省 辽源市 东辽县 我是具体地址', '18111287382', '文可爱', '760', null, '3', '0', null, null, '2019-08-28 14:09:11');
INSERT INTO `orderlist` VALUES ('110', '52', '文可爱', '吉林省 辽源市 东辽县 我是具体地址', '18111287382', '文可爱', '4381.68', null, '2', '1', null, null, '2019-08-28 14:30:46');
INSERT INTO `orderlist` VALUES ('111', '52', '文可爱', '天津市 市辖区 和平区 123', '123', '123', '420.56', null, '3', '0', null, null, '2019-08-28 14:45:57');
INSERT INTO `orderlist` VALUES ('112', '52', '文可爱', '北京市 市辖区 东城区 111', '12121212', '文梦月', '540', null, '2', '0', null, null, '2019-08-28 15:03:01');
INSERT INTO `orderlist` VALUES ('113', '52', '文可爱', '天津市 市辖区 和平区 123', '123', '123', '520', null, '3', '0', null, null, '2019-08-28 15:15:05');
INSERT INTO `orderlist` VALUES ('114', '52', '文可爱', '吉林省 辽源市 东辽县 我是具体地址', '18111287382', '文可爱', '390', null, '2', '0', null, null, '2019-08-28 15:35:05');
INSERT INTO `orderlist` VALUES ('115', '52', '文可爱', '湖南省 长沙市 岳麓区 湖南大学天马学生公寓二区二栋520', '18122838299', '文可爱', '270', null, '2', '0', null, null, '2019-08-28 19:31:52');
INSERT INTO `orderlist` VALUES ('116', '52', '文可爱', '吉林省 辽源市 东辽县 我是具体地址', '18111287382', '文可爱', '520', null, '2', '0', null, null, '2019-08-28 19:32:08');
INSERT INTO `orderlist` VALUES ('117', '52', '文可爱', '吉林省 辽源市 东辽县 我是具体地址', '18111287382', '文可爱', '841.12', null, '2', '0', null, null, '2019-08-29 09:39:08');
INSERT INTO `orderlist` VALUES ('118', '52', '文可爱', '湖南省 长沙市 岳麓区 湖南大学天马学生公寓二区二栋520', '18122838299', '文可爱', '2202.24', null, '4', '1', null, null, '2019-08-29 14:09:02');
INSERT INTO `orderlist` VALUES ('119', '52', '文可爱', '湖南省 长沙市 岳麓区 湖南大学天马学生公寓二区二栋520', '18122838299', '文可爱', '810', null, '1', '0', null, null, '2019-08-29 16:57:27');
INSERT INTO `orderlist` VALUES ('120', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '4040', null, '4', '1', null, null, '2019-08-30 09:20:11');
INSERT INTO `orderlist` VALUES ('121', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '420.56', null, '2', '0', null, null, '2019-08-30 09:42:25');
INSERT INTO `orderlist` VALUES ('122', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '420.56', null, '2', '1', null, null, '2019-08-30 11:29:38');
INSERT INTO `orderlist` VALUES ('123', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '1560', null, '2', '0', null, null, '2019-08-30 13:31:43');
INSERT INTO `orderlist` VALUES ('124', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '1324.76', null, '1', '0', null, null, '2019-08-30 15:49:48');
INSERT INTO `orderlist` VALUES ('125', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '835.32', null, '2', '0', null, null, '2019-08-30 15:56:57');
INSERT INTO `orderlist` VALUES ('126', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '415.32', '420.56', '2', '0', null, null, '2019-08-30 16:30:47');
INSERT INTO `orderlist` VALUES ('127', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '420.56', '420.56', '2', '0', null, null, '2019-08-30 16:36:22');
INSERT INTO `orderlist` VALUES ('128', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '415.32', '420.56', '2', '0', null, null, '2019-08-30 16:38:46');
INSERT INTO `orderlist` VALUES ('129', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '835.88', '841.12', '2', '0', null, null, '2019-08-30 16:40:36');
INSERT INTO `orderlist` VALUES ('130', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '841.12', '841.12', '2', '0', null, null, '2019-08-30 16:42:01');
INSERT INTO `orderlist` VALUES ('131', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '420.56', '420.56', '1', '0', null, null, '2019-08-30 16:43:17');
INSERT INTO `orderlist` VALUES ('132', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '420.56', '420.56', '2', '0', null, null, '2019-08-30 16:43:52');
INSERT INTO `orderlist` VALUES ('133', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '841.12', '841.12', '2', '0', null, null, '2019-08-30 16:44:27');
INSERT INTO `orderlist` VALUES ('134', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '835.88', '841.12', '2', '0', null, null, '2019-08-30 16:47:30');
INSERT INTO `orderlist` VALUES ('135', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '406.91', '420.56', '2', '0', null, null, '2019-08-30 16:50:19');
INSERT INTO `orderlist` VALUES ('136', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '420.56', '420.56', '1', '0', '0', null, '2019-08-30 17:10:14');
INSERT INTO `orderlist` VALUES ('137', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '402.7', '420.56', '2', '0', '1', null, '2019-08-30 17:11:04');
INSERT INTO `orderlist` VALUES ('138', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '398.49', '420.56', '1', '0', '1', null, '2019-08-30 17:13:24');
INSERT INTO `orderlist` VALUES ('139', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '520', null, '2', '0', null, null, '2019-08-30 17:14:16');
INSERT INTO `orderlist` VALUES ('140', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '918.49', '940.56', '1', '0', '1', null, '2019-08-30 17:14:45');
INSERT INTO `orderlist` VALUES ('141', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '1170', '1170', '2', '0', '0', null, '2019-08-30 17:33:13');
INSERT INTO `orderlist` VALUES ('142', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '420.56', '420.56', '2', '0', '0', '0', '2019-08-30 17:34:53');
INSERT INTO `orderlist` VALUES ('143', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '420.56', '420.56', '2', '0', '0', '0', '2019-08-30 17:38:53');
INSERT INTO `orderlist` VALUES ('144', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '398.49', '420.56', '2', '0', '1', '2207', '2019-08-30 17:42:51');
INSERT INTO `orderlist` VALUES ('145', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '398.49', '420.56', '2', '0', '1', '2207', '2019-08-30 17:49:04');
INSERT INTO `orderlist` VALUES ('146', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '497.93', '520', '2', '0', '1', '2207', '2019-08-30 17:52:11');
INSERT INTO `orderlist` VALUES ('147', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '420.56', '420.56', '2', '0', '0', '2207', '2019-08-30 17:53:11');
INSERT INTO `orderlist` VALUES ('148', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '497.93', '520', '2', '0', '1', '2207', '2019-08-30 17:53:27');
INSERT INTO `orderlist` VALUES ('149', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '398.49', '420.56', '2', '0', '1', '2207', '2019-08-30 18:01:01');
INSERT INTO `orderlist` VALUES ('150', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '398.49', '420.56', '2', '0', '1', '2207', '2019-08-30 18:02:19');
INSERT INTO `orderlist` VALUES ('151', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '2281.68', '2281.68', '2', '0', '0', '2207', '2019-08-30 18:17:06');
INSERT INTO `orderlist` VALUES ('152', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '1260.56', '1260.56', '1', '0', '0', '2207', '2019-08-30 18:20:35');
INSERT INTO `orderlist` VALUES ('153', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '420.56', '420.56', '2', '0', '0', '2207', '2019-08-30 18:21:59');
INSERT INTO `orderlist` VALUES ('154', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '420.56', '420.56', '1', '0', '0', '2207', '2019-08-30 18:23:03');
INSERT INTO `orderlist` VALUES ('155', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '420.56', '421', '2', '0', '0', '2207', '2019-08-30 18:24:08');
INSERT INTO `orderlist` VALUES ('156', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '1239.05', '1261', '2', '0', '1', '2207', '2019-08-30 18:28:43');
INSERT INTO `orderlist` VALUES ('157', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '420.56', '421', '2', '0', '0', '0', '2019-08-30 19:01:38');
INSERT INTO `orderlist` VALUES ('158', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '940.56', '941', '2', '0', '0', '0', '2019-08-30 19:09:34');
INSERT INTO `orderlist` VALUES ('159', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '920', '920', '2', '0', '0', '0', '2019-08-30 19:14:42');
INSERT INTO `orderlist` VALUES ('160', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '1270', '1270', '2', '0', '0', '920', '2019-08-30 19:15:30');
INSERT INTO `orderlist` VALUES ('161', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '568.1', '590', '2', '0', '1', '2190', '2019-08-30 19:16:14');
INSERT INTO `orderlist` VALUES ('162', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '520', '520', '2', '0', '0', '590', '2019-08-30 21:54:47');
INSERT INTO `orderlist` VALUES ('163', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '488.9', '500', '2', '0', '1', '1110', '2019-08-30 21:55:13');
INSERT INTO `orderlist` VALUES ('164', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '480', '480', '2', '0', '0', '0', '2019-08-30 21:55:55');
INSERT INTO `orderlist` VALUES ('165', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '420', '420', '2', '0', '0', '480', '2019-08-30 21:56:42');
INSERT INTO `orderlist` VALUES ('166', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '481', '490', '2', '0', '1', '900', '2019-08-30 21:57:15');
INSERT INTO `orderlist` VALUES ('167', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '520', '520', '2', '0', '0', '490', '2019-08-30 21:58:07');
INSERT INTO `orderlist` VALUES ('168', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '1549.9', '1560', '2', '0', '1', '1010', '2019-08-30 22:00:08');
INSERT INTO `orderlist` VALUES ('169', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '2064.4', '2080', '3', '0', '1', '1560', '2019-08-30 22:00:38');
INSERT INTO `orderlist` VALUES ('170', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '504.4', '520', '2', '0', '1', '1560', '2019-08-30 22:02:04');
INSERT INTO `orderlist` VALUES ('171', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '504.4', '520', '3', '0', '1', '1560', '2019-08-31 09:28:57');
INSERT INTO `orderlist` VALUES ('172', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '1261.12', '1261', '2', '0', '0', '520', '2019-08-31 09:43:54');
INSERT INTO `orderlist` VALUES ('173', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '502.19', '520', '2', '0', '1', '1781', '2019-08-31 09:44:43');
INSERT INTO `orderlist` VALUES ('174', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '2095.92', '2101', '2', '0', '1', '520', '2019-08-31 09:48:18');
INSERT INTO `orderlist` VALUES ('175', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '494.78', '520', '2', '0', '1', '2522', '2019-08-31 13:35:36');
INSERT INTO `orderlist` VALUES ('176', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '415.36', '421', '1', '0', '1', '520', '2019-08-31 14:08:14');
INSERT INTO `orderlist` VALUES ('177', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '514.8', '520', '2', '0', '1', '520', '2019-08-31 14:17:38');
INSERT INTO `orderlist` VALUES ('178', '62', '日日日', '河北省 邯郸市 峰峰矿区 我是新注册的用户的新增地址', '13526738920', '新用户', '4399.28', '4404', '1', '0', '1', '520', '2019-08-31 16:32:30');
INSERT INTO `orderlist` VALUES ('179', '62', '日日日', '广东省 珠海市 斗门区 我是新注册的用户的新增地址', '13526738920', '新用户', '6', '6', '1', '0', '0', '520', '2019-09-02 16:54:38');
INSERT INTO `orderlist` VALUES ('180', '62', '日日日', '广东省 珠海市 斗门区 我是新注册的用户的新增地址', '13526738920', '新用户', '-5.2', '0', '1', '0', '1', '520', '2019-09-02 16:55:10');
INSERT INTO `orderlist` VALUES ('181', '62', '日日日', '广东省 珠海市 斗门区 我是新注册的用户的新增地址', '13526738920', '新用户', '-5.2', '0', '1', '0', '1', '520', '2019-09-02 16:55:11');
INSERT INTO `orderlist` VALUES ('182', '62', '日日日', '广东省 珠海市 斗门区 我是新注册的用户的新增地址', '13526738920', '新用户', '514.8', '520', '1', '0', '1', '520', '2019-09-02 16:55:27');
INSERT INTO `orderlist` VALUES ('183', '62', '日日日', '广东省 珠海市 斗门区 我是新注册的用户的新增地址', '13526738920', '新用户', '514.8', '520', '1', '0', '1', '520', '2019-09-02 16:56:06');
INSERT INTO `orderlist` VALUES ('184', '62', '日日日', '广东省 珠海市 斗门区 我是新注册的用户的新增地址', '13526738920', '新用户', '835.92', '841', '1', '0', '1', '520', '2019-09-02 23:53:15');
INSERT INTO `orderlist` VALUES ('185', '62', '日日日', '河北省 秦皇岛市 北戴河区 具体地址', '18111672833', '啦啦啦', '1256.48', '1262', '2', '0', '1', '520', '2019-09-03 01:22:19');
INSERT INTO `orderlist` VALUES ('186', '64', '啦啦啦', '山西省 长治市 襄垣县 我是具体地址', '18111266377', '文可爱', '520', '520', '4', '1', '1', '0', '2019-09-03 08:48:21');
INSERT INTO `orderlist` VALUES ('187', '64', '啦啦啦', '山西省 长治市 襄垣县 我是具体地址', '18111266377', '文可爱', '954.8', '960', '3', '0', '1', '520', '2019-09-03 08:51:17');
INSERT INTO `orderlist` VALUES ('188', '64', '啦啦啦', '河北省 邯郸市 峰峰矿区 啦啦啦', '18726372891', '文可爱', '264.8', '270', '1', '0', '1', '520', '2019-09-03 08:54:56');
INSERT INTO `orderlist` VALUES ('189', '64', '啦啦啦', '河北省 邯郸市 峰峰矿区 啦啦啦', '18726372891', '文可爱', '314.8', '320', '4', '1', '1', '520', '2019-09-03 08:58:19');
INSERT INTO `orderlist` VALUES ('190', '65', 'Vampire', '陕西省 西安市 长安区 沣西新城', '17629275475', '李', '540', '540', '4', '1', '1', '0', '2019-09-05 14:41:54');
INSERT INTO `orderlist` VALUES ('191', '65', 'Vampire', '陕西省 西安市 长安区 沣西新城', '17629275475', '李', '520', '520', '2', '0', '1', '0', '2019-09-05 14:45:56');
INSERT INTO `orderlist` VALUES ('192', '65', 'Vampire', '陕西省 西安市 长安区 沣西新城', '17629275475', '李', '534.8', '540', '4', '1', '1', '520', '2019-09-05 14:46:34');
INSERT INTO `orderlist` VALUES ('193', '66', '11111', '天津市 市辖区 河东区 111', '111', '111', '810', '810', '2', '0', '1', '0', '2019-09-05 14:49:22');
INSERT INTO `orderlist` VALUES ('194', '66', '11111', '天津市 市辖区 河东区 111', '111', '111', '1031.9', '1040', '2', '0', '1', '810', '2019-09-05 14:50:35');
INSERT INTO `orderlist` VALUES ('195', '66', '11111', '天津市 市辖区 河东区 111', '111', '111', '801.9', '810', '2', '0', '1', '810', '2019-09-05 14:52:01');
INSERT INTO `orderlist` VALUES ('196', '66', '11111', '天津市 市辖区 河东区 111', '111', '111', '391.9', '400', '2', '0', '1', '810', '2019-09-05 14:52:28');
INSERT INTO `orderlist` VALUES ('197', '66', '11111', '天津市 市辖区 河东区 111', '111', '111', '636', '640', '4', '1', '1', '400', '2019-09-05 14:53:19');
INSERT INTO `orderlist` VALUES ('198', '66', '11111', '山西省 朔州市 右玉县 厦门', '111', '111', '2520', '2520', '2', '1', '0', '400', '2019-09-05 15:02:28');
INSERT INTO `orderlist` VALUES ('199', '67', '账号', '山西省 长治市 襄垣县 我是具体地址', '18277237388', '文可爱', '420', '420', '2', '0', '1', '0', '2019-09-05 16:05:38');
INSERT INTO `orderlist` VALUES ('200', '67', '账号', '山西省 长治市 襄垣县 我是具体地址', '18277237388', '文可爱', '520', '520', '2', '0', '0', '420', '2019-09-05 16:06:04');
INSERT INTO `orderlist` VALUES ('201', '67', '账号', '山西省 长治市 襄垣县 我是具体地址', '18277237388', '文可爱', '520', '520', '2', '0', '0', '940', '2019-09-05 16:06:20');
INSERT INTO `orderlist` VALUES ('202', '67', '账号', '山西省 长治市 襄垣县 我是具体地址', '18277237388', '文可爱', '520', '520', '3', '1', '0', '940', '2019-09-05 16:09:34');
INSERT INTO `orderlist` VALUES ('203', '67', '账号', '山西省 长治市 襄垣县 我是具体地址', '18277237388', '文可爱', '510.6', '520', '2', '0', '1', '940', '2019-09-05 16:10:35');
INSERT INTO `orderlist` VALUES ('204', '67', '账号', '山西省 长治市 襄垣县 我是具体地址', '18277237388', '文可爱', '940', '940', '2', '0', '0', '520', '2019-09-05 16:11:42');
INSERT INTO `orderlist` VALUES ('205', '67', '账号', '山西省 长治市 襄垣县 我是具体地址', '18277237388', '文可爱', '520', '520', '2', '0', '0', '1460', '2019-09-05 16:12:03');
INSERT INTO `orderlist` VALUES ('206', '67', '账号', '山西省 长治市 襄垣县 我是具体地址', '18277237388', '文可爱', '520', '520', '2', '0', '0', '1980', '2019-09-05 16:12:35');
INSERT INTO `orderlist` VALUES ('207', '70', '曾哥', '河北省 秦皇岛市 北戴河区 我是具体地址', '17122536277', '文可爱', '3140', '3140', '3', '0', '1', '0', '2019-09-05 19:19:27');
INSERT INTO `orderlist` VALUES ('208', '70', '曾哥', '河北省 秦皇岛市 北戴河区 我是具体地址', '17122536277', '文可爱', '1228.6', '1260', '4', '1', '1', '3140', '2019-09-05 19:20:50');

-- ----------------------------
-- Table structure for `order_product`
-- ----------------------------
DROP TABLE IF EXISTS `order_product`;
CREATE TABLE `order_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_number` int(11) DEFAULT NULL COMMENT '该订单下该商品的数量',
  PRIMARY KEY (`id`),
  KEY `fk_order` (`order_id`),
  KEY `fk_product` (`product_id`),
  CONSTRAINT `fk_order` FOREIGN KEY (`order_id`) REFERENCES `orderlist` (`id`),
  CONSTRAINT `fk_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=312 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order_product
-- ----------------------------
INSERT INTO `order_product` VALUES ('176', '130', '104', '1');
INSERT INTO `order_product` VALUES ('177', '129', '104', '1');
INSERT INTO `order_product` VALUES ('178', '126', '104', '1');
INSERT INTO `order_product` VALUES ('179', '129', '105', '1');
INSERT INTO `order_product` VALUES ('180', '133', '105', '1');
INSERT INTO `order_product` VALUES ('181', '140', '106', '1');
INSERT INTO `order_product` VALUES ('182', '129', '106', '1');
INSERT INTO `order_product` VALUES ('183', '127', '107', '1');
INSERT INTO `order_product` VALUES ('184', '129', '107', '1');
INSERT INTO `order_product` VALUES ('185', '140', '108', '3');
INSERT INTO `order_product` VALUES ('186', '127', '108', '3');
INSERT INTO `order_product` VALUES ('187', '139', '109', '1');
INSERT INTO `order_product` VALUES ('188', '127', '109', '1');
INSERT INTO `order_product` VALUES ('189', '131', '110', '5');
INSERT INTO `order_product` VALUES ('190', '128', '110', '1');
INSERT INTO `order_product` VALUES ('191', '130', '110', '3');
INSERT INTO `order_product` VALUES ('192', '130', '111', '1');
INSERT INTO `order_product` VALUES ('193', '129', '112', '1');
INSERT INTO `order_product` VALUES ('194', '127', '112', '1');
INSERT INTO `order_product` VALUES ('195', '128', '113', '1');
INSERT INTO `order_product` VALUES ('196', '138', '114', '1');
INSERT INTO `order_product` VALUES ('197', '133', '115', '1');
INSERT INTO `order_product` VALUES ('198', '134', '116', '1');
INSERT INTO `order_product` VALUES ('199', '130', '117', '2');
INSERT INTO `order_product` VALUES ('200', '128', '118', '1');
INSERT INTO `order_product` VALUES ('201', '130', '118', '4');
INSERT INTO `order_product` VALUES ('202', '129', '119', '2');
INSERT INTO `order_product` VALUES ('203', '137', '119', '1');
INSERT INTO `order_product` VALUES ('204', '132', '120', '1');
INSERT INTO `order_product` VALUES ('205', '128', '120', '2');
INSERT INTO `order_product` VALUES ('206', '141', '120', '1');
INSERT INTO `order_product` VALUES ('207', '124', '120', '2');
INSERT INTO `order_product` VALUES ('208', '126', '120', '3');
INSERT INTO `order_product` VALUES ('209', '130', '121', '1');
INSERT INTO `order_product` VALUES ('210', '130', '122', '1');
INSERT INTO `order_product` VALUES ('211', '131', '123', '3');
INSERT INTO `order_product` VALUES ('212', '133', '124', '3');
INSERT INTO `order_product` VALUES ('213', '128', '124', '1');
INSERT INTO `order_product` VALUES ('214', '132', '125', '1');
INSERT INTO `order_product` VALUES ('215', '130', '125', '1');
INSERT INTO `order_product` VALUES ('216', '130', '126', '1');
INSERT INTO `order_product` VALUES ('217', '130', '127', '1');
INSERT INTO `order_product` VALUES ('218', '130', '128', '1');
INSERT INTO `order_product` VALUES ('219', '130', '129', '2');
INSERT INTO `order_product` VALUES ('220', '130', '130', '2');
INSERT INTO `order_product` VALUES ('221', '130', '131', '1');
INSERT INTO `order_product` VALUES ('222', '130', '132', '1');
INSERT INTO `order_product` VALUES ('223', '130', '133', '2');
INSERT INTO `order_product` VALUES ('224', '130', '134', '2');
INSERT INTO `order_product` VALUES ('225', '130', '135', '1');
INSERT INTO `order_product` VALUES ('226', '130', '136', '1');
INSERT INTO `order_product` VALUES ('227', '130', '137', '1');
INSERT INTO `order_product` VALUES ('228', '130', '138', '1');
INSERT INTO `order_product` VALUES ('229', '131', '139', '1');
INSERT INTO `order_product` VALUES ('230', '131', '140', '1');
INSERT INTO `order_product` VALUES ('231', '130', '140', '1');
INSERT INTO `order_product` VALUES ('232', '128', '141', '1');
INSERT INTO `order_product` VALUES ('233', '140', '141', '1');
INSERT INTO `order_product` VALUES ('234', '130', '142', '1');
INSERT INTO `order_product` VALUES ('235', '130', '143', '1');
INSERT INTO `order_product` VALUES ('236', '130', '144', '1');
INSERT INTO `order_product` VALUES ('237', '130', '145', '1');
INSERT INTO `order_product` VALUES ('238', '131', '146', '1');
INSERT INTO `order_product` VALUES ('239', '130', '147', '1');
INSERT INTO `order_product` VALUES ('240', '131', '148', '1');
INSERT INTO `order_product` VALUES ('241', '130', '149', '1');
INSERT INTO `order_product` VALUES ('242', '130', '150', '1');
INSERT INTO `order_product` VALUES ('243', '130', '151', '3');
INSERT INTO `order_product` VALUES ('244', '128', '151', '1');
INSERT INTO `order_product` VALUES ('245', '142', '151', '1');
INSERT INTO `order_product` VALUES ('246', '132', '152', '2');
INSERT INTO `order_product` VALUES ('247', '130', '152', '1');
INSERT INTO `order_product` VALUES ('248', '130', '153', '1');
INSERT INTO `order_product` VALUES ('249', '130', '154', '1');
INSERT INTO `order_product` VALUES ('250', '130', '155', '1');
INSERT INTO `order_product` VALUES ('251', '130', '156', '2');
INSERT INTO `order_product` VALUES ('252', '132', '156', '1');
INSERT INTO `order_product` VALUES ('253', '130', '157', '1');
INSERT INTO `order_product` VALUES ('254', '130', '158', '1');
INSERT INTO `order_product` VALUES ('255', '131', '158', '1');
INSERT INTO `order_product` VALUES ('256', '132', '159', '1');
INSERT INTO `order_product` VALUES ('257', '142', '159', '1');
INSERT INTO `order_product` VALUES ('258', '137', '160', '1');
INSERT INTO `order_product` VALUES ('259', '142', '160', '2');
INSERT INTO `order_product` VALUES ('260', '137', '161', '1');
INSERT INTO `order_product` VALUES ('261', '135', '161', '1');
INSERT INTO `order_product` VALUES ('262', '131', '162', '1');
INSERT INTO `order_product` VALUES ('263', '142', '163', '1');
INSERT INTO `order_product` VALUES ('264', '141', '164', '1');
INSERT INTO `order_product` VALUES ('265', '132', '165', '1');
INSERT INTO `order_product` VALUES ('266', '139', '166', '1');
INSERT INTO `order_product` VALUES ('267', '131', '167', '1');
INSERT INTO `order_product` VALUES ('268', '138', '168', '4');
INSERT INTO `order_product` VALUES ('269', '134', '169', '4');
INSERT INTO `order_product` VALUES ('270', '131', '170', '1');
INSERT INTO `order_product` VALUES ('271', '128', '171', '1');
INSERT INTO `order_product` VALUES ('272', '132', '172', '1');
INSERT INTO `order_product` VALUES ('273', '130', '172', '2');
INSERT INTO `order_product` VALUES ('274', '131', '173', '1');
INSERT INTO `order_product` VALUES ('275', '130', '174', '2');
INSERT INTO `order_product` VALUES ('276', '132', '174', '3');
INSERT INTO `order_product` VALUES ('277', '131', '175', '1');
INSERT INTO `order_product` VALUES ('278', '130', '176', '1');
INSERT INTO `order_product` VALUES ('279', '131', '177', '1');
INSERT INTO `order_product` VALUES ('280', '130', '178', '8');
INSERT INTO `order_product` VALUES ('281', '131', '178', '2');
INSERT INTO `order_product` VALUES ('282', '143', '179', '2');
INSERT INTO `order_product` VALUES ('283', '131', '182', '1');
INSERT INTO `order_product` VALUES ('284', '131', '183', '1');
INSERT INTO `order_product` VALUES ('285', '130', '184', '2');
INSERT INTO `order_product` VALUES ('286', '130', '185', '3');
INSERT INTO `order_product` VALUES ('287', '134', '186', '1');
INSERT INTO `order_product` VALUES ('288', '135', '187', '3');
INSERT INTO `order_product` VALUES ('289', '137', '188', '1');
INSERT INTO `order_product` VALUES ('290', '135', '189', '1');
INSERT INTO `order_product` VALUES ('291', '137', '190', '2');
INSERT INTO `order_product` VALUES ('292', '125', '191', '1');
INSERT INTO `order_product` VALUES ('293', '137', '192', '2');
INSERT INTO `order_product` VALUES ('294', '137', '193', '3');
INSERT INTO `order_product` VALUES ('295', '131', '194', '2');
INSERT INTO `order_product` VALUES ('296', '137', '195', '3');
INSERT INTO `order_product` VALUES ('297', '149', '196', '2');
INSERT INTO `order_product` VALUES ('298', '135', '197', '2');
INSERT INTO `order_product` VALUES ('299', '126', '198', '6');
INSERT INTO `order_product` VALUES ('300', '126', '199', '1');
INSERT INTO `order_product` VALUES ('301', '128', '200', '1');
INSERT INTO `order_product` VALUES ('302', '128', '201', '1');
INSERT INTO `order_product` VALUES ('303', '128', '202', '1');
INSERT INTO `order_product` VALUES ('304', '128', '203', '1');
INSERT INTO `order_product` VALUES ('305', '128', '204', '1');
INSERT INTO `order_product` VALUES ('306', '126', '204', '1');
INSERT INTO `order_product` VALUES ('307', '128', '205', '1');
INSERT INTO `order_product` VALUES ('308', '128', '206', '1');
INSERT INTO `order_product` VALUES ('309', '124', '207', '5');
INSERT INTO `order_product` VALUES ('310', '128', '207', '2');
INSERT INTO `order_product` VALUES ('311', '126', '208', '3');

-- ----------------------------
-- Table structure for `product`
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `name` varchar(255) DEFAULT NULL COMMENT '商品名称',
  `retailprice` float(11,2) DEFAULT NULL COMMENT '商品售价',
  `remainingamount` int(11) DEFAULT NULL COMMENT '商品库存',
  `ifdelete` int(11) DEFAULT '0',
  `desc` varchar(255) DEFAULT NULL COMMENT '商品描述',
  `selled` int(11) DEFAULT '0' COMMENT '已售出多少件',
  `specification` varchar(255) DEFAULT '0ml' COMMENT '商品规格',
  `classification` int(11) DEFAULT '0' COMMENT '商品类型',
  `imgurl` varchar(255) DEFAULT NULL COMMENT '商品图片地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('124', '兰蔻 清滢柔肤水', '420.00', '17', '0', '我是柔肤水的商品描述', '7', '15ml', '4', 'http://localhost:7001/public/img/sva334fa481565696261860.jpg');
INSERT INTO `product` VALUES ('125', '兰蔻 肌底精华眼霜', '520.00', '16', '0', '我是肌底精华眼霜的商品描述呀呀呀呀呀呀呀呀呀呀呀', '1', '30g', '6', 'http://localhost:7001/public/img/c1db8ypaaqd1565696569085.jpg');
INSERT INTO `product` VALUES ('126', '兰蔻 清滢嫩肤水（中性）', '420.00', '20', '0', '肌底精华眼霜呀呀呀呀呀呀', '14', '30g', '4', 'http://localhost:7001/public/img/un7aqujkyu1566742586097.jpg');
INSERT INTO `product` VALUES ('127', '兰蔻唇膏', '270.00', '34', '1', '兰蔻口红 菁纯柔润丝缎唇膏持久显色滋润保湿赤茶橘120王俊凯力荐', '6', '3.5g', '1', 'http://localhost:7001/public/img/hom7dgkyaer1567446568569.jpg');
INSERT INTO `product` VALUES ('128', '兰蔻 水份缘舒缓晚霜', '520.00', '234', '0', '兰蔻新水份缘舒缓晚霜50ml 清爽滋养保湿补水滋润修护面霜 正品', '18', '50ml', '5', 'http://localhost:7001/public/img/3lxd1fy2b6v1567440434592.jpg');
INSERT INTO `product` VALUES ('129', '兰蔻 持粉底液SPF50+', '270.00', '20', '1', '兰蔻持妆粉底液30ml自然哑光持妆不脱妆不闷痘遮瑕透气', '2', '30ml', '0', 'http://localhost:7001/public/img/ifmq71yv18i1565696766747.jpg');
INSERT INTO `product` VALUES ('130', '兰蔻粉水', '420.56', '7', '0', '兰蔻大粉水400ml 清滢柔肤水爽肤水化妆水保湿水滋润舒缓敏感泛红', '19', '400ml', '4', 'http://localhost:7001/public/img/bkyys1gti271567440202110.jpg');
INSERT INTO `product` VALUES ('131', '精华眼霜', '520.00', '23', '0', '兰蔻发光眼霜15ml 兰蔻小黑瓶眼霜淡化黑眼圈细纹淡褪熊猫眼正品', '12', '15ml', '6', 'http://localhost:7001/public/img/hkgdsvxt161567440237451.jpg');
INSERT INTO `product` VALUES ('132', '兰蔻大蓝水', '420.00', '37', '0', '兰蔻 新清滢嫩肤水200ml/400ml 蓝水 保湿补水滋润爽肤水化妆水', '9', '400ml', '4', 'http://localhost:7001/public/img/4c8wa491rps1567440368930.jpg');
INSERT INTO `product` VALUES ('133', '丝缎唇膏', '300.00', '100', '0', '兰蔻口红 菁纯柔润丝缎唇膏持久显色滋润保湿赤茶', '1', '3.5g', '1', 'http://localhost:7001/public/img/8nq11g9woee1567442580701.jpg');
INSERT INTO `product` VALUES ('134', '舒缓晚霜', '520.00', '28', '0', '兰蔻新水份缘舒缓晚霜50ml 清爽滋养保湿补水滋润修护面霜 正品', '6', '100g', '5', 'http://localhost:7001/public/img/xzwobkf8ptk1567442688931.jpg');
INSERT INTO `product` VALUES ('135', '持妆粉底液', '320.00', '5', '0', '兰蔻持妆粉底液30ml自然哑光持妆不脱妆不闷痘遮瑕透气', '7', '0ml', '2', 'http://localhost:7001/public/img/xgk764g5ih1567442710953.jpg');
INSERT INTO `product` VALUES ('137', '雅诗兰黛口红', '270.00', '20', '0', '兰蔻菁纯小姐金管口红唇膏 网红525樱桃红168胡萝卜色', '12', '3.5g', '1', 'http://localhost:7001/public/img/zief2s5w1ga1567442728668.jpg');
INSERT INTO `product` VALUES ('138', '雅诗兰黛dw油皮亲妈', '390.00', '20', '0', '油皮亲妈你买不买买不买油皮亲妈你买不买买不买', '5', '30ml', '2', 'http://localhost:7001/public/img/dgfsa2tdru1567442743191.jpg');
INSERT INTO `product` VALUES ('139', '雅诗兰黛五色眼影盘', '490.00', '20', '0', '雅诗兰黛眼影 花漾魅型五色眼影盘7g 多色 含眼影刷 干湿两用大牌', '2', '6.5g', '3', 'http://localhost:7001/public/img/778tfkpcgun1567442757432.jpg');
INSERT INTO `product` VALUES ('140', '香奈儿光采透白粉饼', '650.00', '21', '0', 'CHANEL 香奈儿光采透白粉饼 遮瑕定妆 提亮肤色', '4', '8g', '7', 'http://localhost:7001/public/img/1blg1g01q5s1567442777620.jpg');
INSERT INTO `product` VALUES ('141', '兰蔻防晒乳', '480.00', '21', '0', 'Lancome/兰蔻 柔皙深护防晒乳SPF50/PA++++', '2', '50g', '8', 'http://localhost:7001/public/img/aycfq90rl1c1567442801256.jpg');
INSERT INTO `product` VALUES ('142', '我是新增商品眼影', '500.00', '98', '0', 'Lancome兰蔻 五色眼影2g 大地色100# 三色高光腮红修容盘 彩妆盘', '6', '2g', '3', 'http://localhost:7001/public/img/gn8se0jfpaq1567442811251.jpg');
INSERT INTO `product` VALUES ('143', '新增商品', '3.00', '3', '1', '为v温热v认为', '0', null, null, 'http://localhost:7001/public/img/0q9i31tk42ho1567393017831.jpg');
INSERT INTO `product` VALUES ('144', '香水兰蔻', '300.00', '20', '1', '我是兰蔻香水香水………………', '0', null, '0', 'http://localhost:7001/public/img/zz5fl2koex1567446655587.jpg');
INSERT INTO `product` VALUES ('145', '香水', '400.00', '10', '1', 'xiangshuixiangshuixiangshui', '0', null, '0', 'http://localhost:7001/public/img/jmsb4dtjkpd1567446755653.jpg');
INSERT INTO `product` VALUES ('146', '粉底', '300.00', '20', '1', '我是粉底', '0', null, '2', 'http://localhost:7001/public/img/ik7l6lbzmos1567470524465.jpg');
INSERT INTO `product` VALUES ('147', '香奈儿唇膏盘', '320.00', '30', '1', '我是香奈儿唇膏我是香奈儿唇膏我是香奈儿唇膏', '0', null, '1', 'http://localhost:7001/public/img/7b9i0048yam1567664202952.jpg');
INSERT INTO `product` VALUES ('148', '香奈儿口红', '200.00', '100', '1', '香奈儿口红香奈儿口红香奈儿口红香奈儿口红', '0', null, '1', 'http://localhost:7001/public/img/060t7jklk2hw1567661021630.jpg');
INSERT INTO `product` VALUES ('149', '粉饼', '200.00', '25', '0', '我是粉饼', '2', null, '7', 'http://localhost:7001/public/img/7vsgwvr27ys1567472826932.jpg');
INSERT INTO `product` VALUES ('150', '防晒霜', '200.00', '200', '0', '我是防晒霜', '0', '50ml', '8', 'http://localhost:7001/public/img/4n6jzjl2aju1567660927192.jpg');
INSERT INTO `product` VALUES ('151', '腮红', '200.00', '30', '0', '我是腮红', '0', '50ml', '8', 'http://localhost:7001/public/img/q0vnlxr27v1567683081123.jpg');
INSERT INTO `product` VALUES ('152', '柔肤水', '4.00', '1', '1', '我是新增柔肤水的描述', '0', '20ml', '4', 'http://localhost:7001/public/img/bwk5cfuswuh1567663401173.jpg');
INSERT INTO `product` VALUES ('153', '粉饼', '200.00', '10', '1', '我是粉饼', '0', '3.8g', '7', 'http://localhost:7001/public/img/cclj2y1686w1567663693255.jpg');
INSERT INTO `product` VALUES ('154', '防晒霜aaa', '300.00', '20', '1', '我是防晒霜', '0', '20g', '8', 'http://localhost:7001/public/img/xyfze10vfmj1567664117138.jpg');
INSERT INTO `product` VALUES ('155', '粉底', '300.00', '20', '1', '我是粉底的描述', '0', '30ml', '2', 'http://localhost:7001/public/img/v4yb01klt7f1567664573825.jpg');
INSERT INTO `product` VALUES ('156', '测试sahnp ', '300.00', '200', '1', '我是测试商品', '0', '30g', '1', 'http://localhost:7001/public/img/v5a524lk76p1567665156387.jpg');
INSERT INTO `product` VALUES ('157', '最好看的fenbing', '300.00', '30', '1', '我是最好看的粉饼', '0', '20ml', '7', 'http://localhost:7001/public/img/tl9vk1nzqcs1567672411198.jpg');
INSERT INTO `product` VALUES ('158', '保湿水', '360.00', '30', '1', '我是保湿水保湿水', '0', '150ml', '4', 'http://localhost:7001/public/img/sthmbi73281567679706250.jpg');
INSERT INTO `product` VALUES ('159', '粉水', '420.00', '5', '0', '我是粉水', '0', '400ml', '4', 'http://localhost:7001/public/img/sz127a4xtac1567683131748.jpg');

-- ----------------------------
-- Table structure for `shopchat`
-- ----------------------------
DROP TABLE IF EXISTS `shopchat`;
CREATE TABLE `shopchat` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '购物车id',
  `user_account` varchar(255) DEFAULT NULL COMMENT '用户账号',
  `product_id` int(11) NOT NULL COMMENT '商品id',
  `amount` int(11) DEFAULT '1' COMMENT '加入购物车的数量',
  `name` varchar(255) DEFAULT NULL COMMENT '商品名字',
  `specification` varchar(255) DEFAULT '0ml' COMMENT '商品规格',
  `remainingamount` int(11) DEFAULT '0' COMMENT '剩余库存',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  `retailprice` float DEFAULT NULL COMMENT '零售价',
  `ifdelete` int(11) DEFAULT '0' COMMENT '是否被删除',
  `num` varchar(255) DEFAULT NULL COMMENT '商品编号',
  `selled` int(11) DEFAULT '0' COMMENT '已售',
  `classification` int(11) DEFAULT '0' COMMENT '商品分类',
  `imgurl` varchar(255) DEFAULT NULL COMMENT '图片地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shopchat
-- ----------------------------
INSERT INTO `shopchat` VALUES ('93', '111111', '127', '4', 'Lancome/兰蔻 菁纯柔润丝缎唇膏', '0ml', '34', 'ewrg3', '270', '0', 's2323132', '54', '1', 'http://localhost:7001/public/img/bn7csayi5ns1565696657635.jpg');
INSERT INTO `shopchat` VALUES ('98', '巴拉巴拉', '133', '1', '丝缎唇膏', '0ml', '0', '12312', '270', '0', null, '43', '1', 'http://localhost:7001/public/img/bed6oropvwr1565709083186.jpg');
INSERT INTO `shopchat` VALUES ('126', '巴拉巴拉', '130', '1', '兰蔻粉水', '400ml', '0', '兰蔻大粉水400ml 清滢柔肤水爽肤水化妆水保湿水滋润舒缓敏感泛红', '420.56', '0', null, '9', '4', 'http://localhost:7001/public/img/3kkqdke9k0u1566978459627.jpg');
INSERT INTO `shopchat` VALUES ('127', '巴拉巴拉', '129', '1', 'Lancome/兰蔻 持妆轻透粉底液SPF50+/PA+++', '30ml', '20', '兰蔻持妆粉底液30ml自然哑光持妆不脱妆不闷痘遮瑕透气', '270', '0', null, '1', '2', 'http://localhost:7001/public/img/ifmq71yv18i1565696766747.jpg');
INSERT INTO `shopchat` VALUES ('128', '巴拉巴拉', '128', '1', 'Lancome/兰蔻 水份缘舒缓晚霜', '50ml', '234', '兰蔻新水份缘舒缓晚霜50ml 清爽滋养保湿补水滋润修护面霜 正品', '520', '0', null, '3', '5', 'http://localhost:7001/public/img/s2ntcfnz1x1566978415625.jpg');
INSERT INTO `shopchat` VALUES ('136', '文可爱', '128', '1', 'Lancome/兰蔻 水份缘舒缓晚霜', '50ml', '234', '兰蔻新水份缘舒缓晚霜50ml 清爽滋养保湿补水滋润修护面霜 正品', '520', '0', null, '4', '5', 'http://localhost:7001/public/img/s2ntcfnz1x1566978415625.jpg');
INSERT INTO `shopchat` VALUES ('146', 'Vampire', '146', '1', '粉底', null, '20', '我是粉底', '300', '0', null, '0', '2', 'http://localhost:7001/public/img/ik7l6lbzmos1567470524465.jpg');
INSERT INTO `shopchat` VALUES ('152', '账号', '128', '1', '兰蔻 水份缘舒缓晚霜', '50ml', '234', '兰蔻新水份缘舒缓晚霜50ml 清爽滋养保湿补水滋润修护面霜 正品', '520', '0', null, '16', '5', 'http://localhost:7001/public/img/3lxd1fy2b6v1567440434592.jpg');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_account` varchar(255) NOT NULL COMMENT '用户账号',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `phone` varchar(255) DEFAULT NULL COMMENT '电话',
  `all_integral` int(11) DEFAULT '0' COMMENT '总积分',
  `integral` int(11) DEFAULT '0' COMMENT '用户剩余积分',
  `question` varchar(255) DEFAULT NULL COMMENT '密保问题',
  `answer` varchar(255) DEFAULT NULL COMMENT '密保答案',
  `ifdelete` int(11) NOT NULL DEFAULT '0' COMMENT '是否被删除',
  PRIMARY KEY (`id`),
  KEY `user_account` (`user_account`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('52', '文可爱', null, '18111263733', '23076', '189', '您的小学叫什么名字？', 'xiaoxue', '0');
INSERT INTO `user` VALUES ('55', '巴拉巴拉', null, '18111366288', '1940', '520', '黄金糕', '我爱吃黄金糕', '0');
INSERT INTO `user` VALUES ('58', '文小小可爱', null, '17829382278', '9000', '30', null, null, '0');
INSERT INTO `user` VALUES ('59', '文大大可爱', '123456', '18922345672', '0', '0', null, null, '0');
INSERT INTO `user` VALUES ('61', '文文文', null, '18020939290', '500', '10', null, null, '0');
INSERT INTO `user` VALUES ('62', '日日日', '090909', '18910220222', '32782', '4926', '您母亲的名字？', '母亲', '0');
INSERT INTO `user` VALUES ('64', '啦啦啦', '090909', '18111253622', '520', '520', null, null, '0');
INSERT INTO `user` VALUES ('65', 'Vampire', '199601', '17629275475', '1060', '540', null, null, '0');
