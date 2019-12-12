// 整理后的国家数据
var countryComData = {
    countryData: [
        {
            "chineseName": "中国",
            "country": "China",
            "region": "+86",
            "shortName": "CN",
            "showName": "+86(China)"
        },
        {
            "chineseName": "中国香港",
            "country": "Hongkong,China",
            "region": "+852",
            "shortName": "HK",
            "showName": "+852(Hongkong)"
        },
        {
            "chineseName": "中国澳门",
            "country": "Macao,China",
            "region": "+853",
            "shortName": "MO",
            "showName": "+853(Macao)"
        },
        {
            "chineseName": "中国台湾",
            "country": "Taiwan,China",
            "region": "+886",
            "shortName": "TW",
            "showName": "+886(Taiwan)"
        },
        {
            "chineseName": "柬埔寨",
            "country": "Cambodia",
            "region": "+855",
            "shortName": "KH",
            "showName": "+855(Cambodia)"
        },
        {
            "chineseName": "英国",
            "country": "United Kiongdom",
            "region": "+44",
            "shortName": "GB",
            "showName": "+44(United Kiongdom)"
        },
        {
            "chineseName": "美国",
            "country": "United States of America",
            "region": "+1",
            "shortName": "US",
            "showName": "+1(United States of America)"
        },
        {
            "chineseName": "法国",
            "country": "France",
            "region": "+33",
            "shortName": "FR",
            "showName": "+33(France)"
        },
        {
            "chineseName": "德国",
            "country": "Germany",
            "region": "+49",
            "shortName": "DE",
            "showName": "+49(Germany)"
        },
        {
            "chineseName": "澳大利亚",
            "country": "Australia",
            "region": "+61",
            "shortName": "AU",
            "showName": "+61(Australia)"
        },
        {
            "chineseName": "日本",
            "country": "Japan",
            "region": "+81",
            "shortName": "JP",
            "showName": "+81(Japan)"
        },
        {
            "chineseName": "加拿大",
            "country": "Canada",
            "region": "+1",
            "shortName": "CA",
            "showName": "+1(Canada)"
        },
        {
            "chineseName": "韩国",
            "country": "Korea",
            "region": "+82",
            "shortName": "KR",
            "showName": "+82(Korea)"
        },
        {
            "chineseName": "西班牙",
            "country": "Spain",
            "region": "+34",
            "shortName": "ES",
            "showName": "+34(Spain)"
        },
        {
            "chineseName": "意大利",
            "country": "Italy",
            "region": "+39",
            "shortName": "IT",
            "showName": "+39(Italy)"
        },
        {
            "chineseName": "越南",
            "country": "Vietnam",
            "region": "+84",
            "shortName": "VN",
            "showName": "+84(Vietnam)"
        },
        {
            "chineseName": "荷兰",
            "country": "Netherlands ",
            "region": "+31",
            "shortName": "NL",
            "showName": "+31(Netherlands )"
        },
        {
            "chineseName": "印度",
            "country": "India",
            "region": "+91",
            "shortName": "IN",
            "showName": "+91(India)"
        },
        {
            "chineseName": "泰国",
            "country": "Thailand",
            "region": "+66",
            "shortName": "TH",
            "showName": "+66(Thailand)"
        },
        {
            "chineseName": "俄罗斯",
            "country": "Russia",
            "region": "+7",
            "shortName": "RU",
            "showName": "+7(Russia)"
        },
        {
            "chineseName": "新加坡",
            "country": "Singapore",
            "region": "+65",
            "shortName": "SG",
            "showName": "+65(Singapore)"
        },
        {
            "chineseName": "马来西亚",
            "country": "Malaysia",
            "region": "+60",
            "shortName": "MY",
            "showName": "+60(Malaysia)"
        },
        {
            "chineseName": "菲律宾",
            "country": "Philippines ",
            "region": "+63",
            "shortName": "PH",
            "showName": "+63(Philippines )"
        },
        {
            "chineseName": "爱尔兰",
            "country": "Ireland",
            "region": "+353",
            "shortName": "IE",
            "showName": "+353(Ireland)"
        },
        {
            "chineseName": "安哥拉",
            "country": "Angola",
            "region": "+244",
            "shortName": "AO",
            "showName": "+244(Angola)"
        },
        {
            "chineseName": "阿富汗",
            "country": "Afghanistan",
            "region": "+93",
            "shortName": "AF",
            "showName": "+93(Afghanistan)"
        },
        {
            "chineseName": "阿尔巴尼亚 ",
            "country": "Albania",
            "region": "+355",
            "shortName": "AL",
            "showName": "+355(Albania)"
        },
        {
            "chineseName": "阿尔及利亚",
            "country": "Algeria",
            "region": "+213",
            "shortName": "DZ",
            "showName": "+213(Algeria)"
        },
        {
            "chineseName": "安道尔共和国",
            "country": "Andorra",
            "region": "+376",
            "shortName": "AD",
            "showName": "+376(Andorra)"
        },
        {
            "chineseName": "安圭拉岛",
            "country": "Anguilla",
            "region": "+1264",
            "shortName": "AI",
            "showName": "+1264(Anguilla)"
        },
        {
            "chineseName": "安提瓜和巴布达",
            "country": "Antigua and Barbuda",
            "region": "+1268",
            "shortName": "AG",
            "showName": "+1268(Antigua and Barbuda)"
        },
        {
            "chineseName": "阿根廷",
            "country": "Argentina",
            "region": "+54",
            "shortName": "AR",
            "showName": "+54(Argentina)"
        },
        {
            "chineseName": "亚美尼亚",
            "country": "Armenia",
            "region": "+374",
            "shortName": "AM",
            "showName": "+374(Armenia)"
        },
        {
            "chineseName": "阿森松",
            "country": "Ascension",
            "region": "+247",
            "shortName": "　",
            "showName": "+247(Ascension)"
        },
        {
            "chineseName": "奥地利",
            "country": "Austria",
            "region": "+43",
            "shortName": "AT",
            "showName": "+43(Austria)"
        },
        {
            "chineseName": "阿塞拜疆",
            "country": "Azerbaijan",
            "region": "+994",
            "shortName": "AZ",
            "showName": "+994(Azerbaijan)"
        },
        {
            "chineseName": "巴哈马",
            "country": "Bahamas",
            "region": "+1242",
            "shortName": "BS",
            "showName": "+1242(Bahamas)"
        },
        {
            "chineseName": "巴林",
            "country": "Bahrain",
            "region": "+973",
            "shortName": "BH",
            "showName": "+973(Bahrain)"
        },
        {
            "chineseName": "孟加拉国",
            "country": "Bangladesh",
            "region": "+880",
            "shortName": "BD",
            "showName": "+880(Bangladesh)"
        },
        {
            "chineseName": "巴巴多斯",
            "country": "Barbados",
            "region": "+1246",
            "shortName": "BB",
            "showName": "+1246(Barbados)"
        },
        {
            "chineseName": "白俄罗斯",
            "country": "Belarus",
            "region": "+375",
            "shortName": "BY",
            "showName": "+375(Belarus)"
        },
        {
            "chineseName": "比利时",
            "country": "Belgium",
            "region": "+32",
            "shortName": "BE",
            "showName": "+32(Belgium)"
        },
        {
            "chineseName": "伯利兹",
            "country": "Belize",
            "region": "+501",
            "shortName": "BZ",
            "showName": "+501(Belize)"
        },
        {
            "chineseName": "贝宁",
            "country": "Benin",
            "region": "+229",
            "shortName": "BJ",
            "showName": "+229(Benin)"
        },
        {
            "chineseName": "百慕大群岛",
            "country": "BermudaIs.",
            "region": "+1441",
            "shortName": "BM",
            "showName": "+1441(BermudaIs.)"
        },
        {
            "chineseName": "玻利维亚",
            "country": "Bolivia",
            "region": "+591",
            "shortName": "BO",
            "showName": "+591(Bolivia)"
        },
        {
            "chineseName": "博茨瓦纳",
            "country": "Botswana",
            "region": "+267",
            "shortName": "BW",
            "showName": "+267(Botswana)"
        },
        {
            "chineseName": "巴西",
            "country": "Brazil",
            "region": "+55",
            "shortName": "BR",
            "showName": "+55(Brazil)"
        },
        {
            "chineseName": "文莱",
            "country": "Brunei",
            "region": "+673",
            "shortName": "BN",
            "showName": "+673(Brunei)"
        },
        {
            "chineseName": "保加利亚",
            "country": "Bulgaria",
            "region": "+359",
            "shortName": "BG",
            "showName": "+359(Bulgaria)"
        },
        {
            "chineseName": "布基纳法索",
            "country": "Burkina-faso",
            "region": "+226",
            "shortName": "BF",
            "showName": "+226(Burkina-faso)"
        },
        {
            "chineseName": "缅甸",
            "country": "Burma",
            "region": "+95",
            "shortName": "MM",
            "showName": "+95(Burma)"
        },
        {
            "chineseName": "布隆迪",
            "country": "Burundi",
            "region": "+257",
            "shortName": "BI",
            "showName": "+257(Burundi)"
        },
        {
            "chineseName": "喀麦隆",
            "country": "Cameroon",
            "region": "+237",
            "shortName": "CM",
            "showName": "+237(Cameroon)"
        },
        {
            "chineseName": "开曼群岛",
            "country": "Cayman Is.",
            "region": "+1345",
            "shortName": "　",
            "showName": "+1345(Cayman Is.)"
        },
        {
            "chineseName": "中非共和国 ",
            "country": "Central African Republic",
            "region": "+236",
            "shortName": "CF",
            "showName": "+236(Central African Republic)"
        },
        {
            "chineseName": "乍得",
            "country": "Chad",
            "region": "+235",
            "shortName": "TD",
            "showName": "+235(Chad)"
        },
        {
            "chineseName": "智利",
            "country": "Chile",
            "region": "+56",
            "shortName": "CL",
            "showName": "+56(Chile)"
        },
        {
            "chineseName": "哥伦比亚",
            "country": "Colombia",
            "region": "+57",
            "shortName": "CO",
            "showName": "+57(Colombia)"
        },
        {
            "chineseName": "刚果",
            "country": "Congo",
            "region": "+242",
            "shortName": "CG",
            "showName": "+242(Congo)"
        },
        {
            "chineseName": "库克群岛",
            "country": "Cook Is.",
            "region": "+682",
            "shortName": "CK",
            "showName": "+682(Cook Is.)"
        },
        {
            "chineseName": "哥斯达黎加",
            "country": "Costa Rica",
            "region": "+506",
            "shortName": "CR",
            "showName": "+506(Costa Rica)"
        },
        {
            "chineseName": "古巴",
            "country": "Cuba",
            "region": "+53",
            "shortName": "CU",
            "showName": "+53(Cuba)"
        },
        {
            "chineseName": "塞浦路斯",
            "country": "Cyprus",
            "region": "+357",
            "shortName": "CY",
            "showName": "+357(Cyprus)"
        },
        {
            "chineseName": "捷克",
            "country": "Czech Republic",
            "region": "+420",
            "shortName": "CZ",
            "showName": "+420(Czech Republic)"
        },
        {
            "chineseName": "丹麦",
            "country": "Denmark",
            "region": "+45",
            "shortName": "DK",
            "showName": "+45(Denmark)"
        },
        {
            "chineseName": "吉布提",
            "country": "Djibouti",
            "region": "+253",
            "shortName": "DJ",
            "showName": "+253(Djibouti)"
        },
        {
            "chineseName": "多米尼加共和国",
            "country": "Dominica Rep.",
            "region": "+1890",
            "shortName": "DO",
            "showName": "+1890(Dominica Rep.)"
        },
        {
            "chineseName": "厄瓜多尔",
            "country": "Ecuador",
            "region": "+593",
            "shortName": "EC",
            "showName": "+593(Ecuador)"
        },
        {
            "chineseName": "埃及",
            "country": "Egypt",
            "region": "+20",
            "shortName": "EG",
            "showName": "+20(Egypt)"
        },
        {
            "chineseName": "萨尔瓦多",
            "country": "EISalvador",
            "region": "+503",
            "shortName": "SV",
            "showName": "+503(EISalvador)"
        },
        {
            "chineseName": "爱沙尼亚",
            "country": "Estonia",
            "region": "+372",
            "shortName": "EE",
            "showName": "+372(Estonia)"
        },
        {
            "chineseName": "埃塞俄比亚",
            "country": "Ethiopia",
            "region": "+251",
            "shortName": "ET",
            "showName": "+251(Ethiopia)"
        },
        {
            "chineseName": "斐济",
            "country": "Fiji",
            "region": "+679",
            "shortName": "FJ",
            "showName": "+679(Fiji)"
        },
        {
            "chineseName": "芬兰",
            "country": "Finland",
            "region": "+358",
            "shortName": "FI",
            "showName": "+358(Finland)"
        },
        {
            "chineseName": "法属圭亚那",
            "country": "French Guiana",
            "region": "+594",
            "shortName": "GF",
            "showName": "+594(French Guiana)"
        },
        {
            "chineseName": "加蓬",
            "country": "Gabon",
            "region": "+241",
            "shortName": "GA",
            "showName": "+241(Gabon)"
        },
        {
            "chineseName": "冈比亚",
            "country": "Gambia",
            "region": "+220",
            "shortName": "GM",
            "showName": "+220(Gambia)"
        },
        {
            "chineseName": "格鲁吉亚",
            "country": "Georgia",
            "region": "+995",
            "shortName": "GE",
            "showName": "+995(Georgia)"
        },
        {
            "chineseName": "加纳",
            "country": "Ghana",
            "region": "+233",
            "shortName": "GH",
            "showName": "+233(Ghana)"
        },
        {
            "chineseName": "直布罗陀",
            "country": "Gibraltar",
            "region": "+350",
            "shortName": "GI",
            "showName": "+350(Gibraltar)"
        },
        {
            "chineseName": "希腊",
            "country": "Greece",
            "region": "+30",
            "shortName": "GR",
            "showName": "+30(Greece)"
        },
        {
            "chineseName": "格林纳达",
            "country": "Grenada",
            "region": "+1809",
            "shortName": "GD",
            "showName": "+1809(Grenada)"
        },
        {
            "chineseName": "关岛",
            "country": "Guam",
            "region": "+1671",
            "shortName": "GU",
            "showName": "+1671(Guam)"
        },
        {
            "chineseName": "危地马拉",
            "country": "Guatemala",
            "region": "+502",
            "shortName": "GT",
            "showName": "+502(Guatemala)"
        },
        {
            "chineseName": "几内亚",
            "country": "Guinea",
            "region": "+224",
            "shortName": "GN",
            "showName": "+224(Guinea)"
        },
        {
            "chineseName": "圭亚那",
            "country": "Guyana",
            "region": "+592",
            "shortName": "GY",
            "showName": "+592(Guyana)"
        },
        {
            "chineseName": "海地",
            "country": "Haiti",
            "region": "+509",
            "shortName": "HT",
            "showName": "+509(Haiti)"
        },
        {
            "chineseName": "洪都拉斯",
            "country": "Honduras",
            "region": "+504",
            "shortName": "HN",
            "showName": "+504(Honduras)"
        },
        {
            "chineseName": "匈牙利",
            "country": "Hungary",
            "region": "+36",
            "shortName": "HU",
            "showName": "+36(Hungary)"
        },
        {
            "chineseName": "冰岛",
            "country": "Iceland",
            "region": "+354",
            "shortName": "IS",
            "showName": "+354(Iceland)"
        },
        {
            "chineseName": "印度尼西亚",
            "country": "Indonesia",
            "region": "+62",
            "shortName": "ID",
            "showName": "+62(Indonesia)"
        },
        {
            "chineseName": "伊朗",
            "country": "Iran",
            "region": "+98",
            "shortName": "IR",
            "showName": "+98(Iran)"
        },
        {
            "chineseName": "伊拉克",
            "country": "Iraq",
            "region": "+964",
            "shortName": "IQ",
            "showName": "+964(Iraq)"
        },
        {
            "chineseName": "以色列",
            "country": "Israel",
            "region": "+972",
            "shortName": "IL",
            "showName": "+972(Israel)"
        },
        {
            "chineseName": "科特迪瓦",
            "country": "IvoryCoast",
            "region": "+225",
            "shortName": "　",
            "showName": "+225(IvoryCoast)"
        },
        {
            "chineseName": "牙买加",
            "country": "Jamaica",
            "region": "+1876",
            "shortName": "JM",
            "showName": "+1876(Jamaica)"
        },
        {
            "chineseName": "约旦",
            "country": "Jordan",
            "region": "+962",
            "shortName": "JO",
            "showName": "+962(Jordan)"
        },
        {
            "chineseName": "哈萨克斯坦 ",
            "country": "Kazakstan",
            "region": "+327",
            "shortName": "KZ",
            "showName": "+327(Kazakstan)"
        },
        {
            "chineseName": "肯尼亚",
            "country": "Kenya",
            "region": "+254",
            "shortName": "KE",
            "showName": "+254(Kenya)"
        },
        {
            "chineseName": "科威特",
            "country": "Kuwait",
            "region": "+965",
            "shortName": "KW",
            "showName": "+965(Kuwait)"
        },
        {
            "chineseName": "吉尔吉斯坦 ",
            "country": "Kyrgyzstan",
            "region": "+331",
            "shortName": "KG",
            "showName": "+331(Kyrgyzstan)"
        },
        {
            "chineseName": "老挝",
            "country": "Laos",
            "region": "+856",
            "shortName": "LA",
            "showName": "+856(Laos)"
        },
        {
            "chineseName": "拉脱维亚",
            "country": "Latvia",
            "region": "+371",
            "shortName": "LV",
            "showName": "+371(Latvia)"
        },
        {
            "chineseName": "黎巴嫩",
            "country": "Lebanon",
            "region": "+961",
            "shortName": "LB",
            "showName": "+961(Lebanon)"
        },
        {
            "chineseName": "莱索托",
            "country": "Lesotho",
            "region": "+266",
            "shortName": "LS",
            "showName": "+266(Lesotho)"
        },
        {
            "chineseName": "利比里亚",
            "country": "Liberia",
            "region": "+231",
            "shortName": "LR",
            "showName": "+231(Liberia)"
        },
        {
            "chineseName": "利比亚",
            "country": "Libya",
            "region": "+218",
            "shortName": "LY",
            "showName": "+218(Libya)"
        },
        {
            "chineseName": "列支敦士登",
            "country": "Liechtenstein",
            "region": "+423",
            "shortName": "LI",
            "showName": "+423(Liechtenstein)"
        },
        {
            "chineseName": "立陶宛",
            "country": "Lithuania",
            "region": "+370",
            "shortName": "LT",
            "showName": "+370(Lithuania)"
        },
        {
            "chineseName": "卢森堡",
            "country": "Luxembourg",
            "region": "+352",
            "shortName": "LU",
            "showName": "+352(Luxembourg)"
        },
        {
            "chineseName": "马达加斯加",
            "country": "Madagascar",
            "region": "+261",
            "shortName": "MG",
            "showName": "+261(Madagascar)"
        },
        {
            "chineseName": "马拉维",
            "country": "Malawi",
            "region": "+265",
            "shortName": "MW",
            "showName": "+265(Malawi)"
        },
        {
            "chineseName": "马尔代夫",
            "country": "Maldives",
            "region": "+960",
            "shortName": "MV",
            "showName": "+960(Maldives)"
        },
        {
            "chineseName": "马里",
            "country": "Mali",
            "region": "+223",
            "shortName": "ML",
            "showName": "+223(Mali)"
        },
        {
            "chineseName": "马耳他",
            "country": "Malta",
            "region": "+356",
            "shortName": "MT",
            "showName": "+356(Malta)"
        },
        {
            "chineseName": "马里亚那群岛",
            "country": "Mariana Is",
            "region": "+1670",
            "shortName": "　",
            "showName": "+1670(Mariana Is)"
        },
        {
            "chineseName": "马提尼克",
            "country": "Martinique",
            "region": "+596",
            "shortName": "　",
            "showName": "+596(Martinique)"
        },
        {
            "chineseName": "毛里求斯",
            "country": "Mauritius",
            "region": "+230",
            "shortName": "MU",
            "showName": "+230(Mauritius)"
        },
        {
            "chineseName": "墨西哥",
            "country": "Mexico",
            "region": "+52",
            "shortName": "MX",
            "showName": "+52(Mexico)"
        },
        {
            "chineseName": "摩尔多瓦",
            "country": "Moldova, Republic of",
            "region": "+373",
            "shortName": "MD",
            "showName": "+373(Moldova, Republic of)"
        },
        {
            "chineseName": "摩纳哥",
            "country": "Monaco",
            "region": "+377",
            "shortName": "MC",
            "showName": "+377(Monaco)"
        },
        {
            "chineseName": "蒙古",
            "country": "Mongolia",
            "region": "+976",
            "shortName": "MN",
            "showName": "+976(Mongolia)"
        },
        {
            "chineseName": "蒙特塞拉特岛",
            "country": "Montserrat Is",
            "region": "+1664",
            "shortName": "MS",
            "showName": "+1664(Montserrat Is)"
        },
        {
            "chineseName": "摩洛哥",
            "country": "Morocco",
            "region": "+212",
            "shortName": "MA",
            "showName": "+212(Morocco)"
        },
        {
            "chineseName": "莫桑比克",
            "country": "Mozambique",
            "region": "+258",
            "shortName": "MZ",
            "showName": "+258(Mozambique)"
        },
        {
            "chineseName": "纳米比亚",
            "country": "Namibia",
            "region": "+264",
            "shortName": "NA",
            "showName": "+264(Namibia)"
        },
        {
            "chineseName": "瑙鲁",
            "country": "Nauru",
            "region": "+674",
            "shortName": "NR",
            "showName": "+674(Nauru)"
        },
        {
            "chineseName": "尼泊尔",
            "country": "Nepal",
            "region": "+977",
            "shortName": "NP",
            "showName": "+977(Nepal)"
        },
        {
            "chineseName": "荷属安的列斯",
            "country": "Netheriands Antilles",
            "region": "+599",
            "shortName": "　",
            "showName": "+599(Netheriands Antilles)"
        },
        {
            "chineseName": "新西兰",
            "country": "NewZealand",
            "region": "+64",
            "shortName": "NZ",
            "showName": "+64(NewZealand)"
        },
        {
            "chineseName": "尼加拉瓜",
            "country": "Nicaragua",
            "region": "+505",
            "shortName": "NI",
            "showName": "+505(Nicaragua)"
        },
        {
            "chineseName": "尼日尔",
            "country": "Niger",
            "region": "+227",
            "shortName": "NE",
            "showName": "+227(Niger)"
        },
        {
            "chineseName": "尼日利亚",
            "country": "Nigeria",
            "region": "+234",
            "shortName": "NG",
            "showName": "+234(Nigeria)"
        },
        {
            "chineseName": "朝鲜",
            "country": "North Korea",
            "region": "+850",
            "shortName": "KP",
            "showName": "+850(North Korea)"
        },
        {
            "chineseName": "挪威",
            "country": "Norway",
            "region": "+47",
            "shortName": "NO",
            "showName": "+47(Norway)"
        },
        {
            "chineseName": "阿曼",
            "country": "Oman",
            "region": "+968",
            "shortName": "OM",
            "showName": "+968(Oman)"
        },
        {
            "chineseName": "巴基斯坦",
            "country": "Pakistan",
            "region": "+92",
            "shortName": "PK",
            "showName": "+92(Pakistan)"
        },
        {
            "chineseName": "巴拿马",
            "country": "Panama",
            "region": "+507",
            "shortName": "PA",
            "showName": "+507(Panama)"
        },
        {
            "chineseName": "巴布亚新几内亚",
            "country": "Papua New Cuinea",
            "region": "+675",
            "shortName": "PG",
            "showName": "+675(Papua New Cuinea)"
        },
        {
            "chineseName": "巴拉圭",
            "country": "Paraguay",
            "region": "+595",
            "shortName": "PY",
            "showName": "+595(Paraguay)"
        },
        {
            "chineseName": "秘鲁",
            "country": "Peru",
            "region": "+51",
            "shortName": "PE",
            "showName": "+51(Peru)"
        },
        {
            "chineseName": "波兰",
            "country": "Poland",
            "region": "+48",
            "shortName": "PL",
            "showName": "+48(Poland)"
        },
        {
            "chineseName": "法属玻利尼西亚",
            "country": "French Polynesia",
            "region": "+689",
            "shortName": "PF",
            "showName": "+689(French Polynesia)"
        },
        {
            "chineseName": "葡萄牙",
            "country": "Portugal",
            "region": "+351",
            "shortName": "PT",
            "showName": "+351(Portugal)"
        },
        {
            "chineseName": "波多黎各",
            "country": "PuertoRico",
            "region": "+1787",
            "shortName": "PR",
            "showName": "+1787(PuertoRico)"
        },
        {
            "chineseName": "卡塔尔",
            "country": "Qatar",
            "region": "+974",
            "shortName": "QA",
            "showName": "+974(Qatar)"
        },
        {
            "chineseName": "留尼旺",
            "country": "Reunion",
            "region": "+262",
            "shortName": "　",
            "showName": "+262(Reunion)"
        },
        {
            "chineseName": "罗马尼亚",
            "country": "Romania",
            "region": "+40",
            "shortName": "RO",
            "showName": "+40(Romania)"
        },
        {
            "chineseName": "圣卢西亚",
            "country": "Saint Lueia",
            "region": "+1758",
            "shortName": "LC",
            "showName": "+1758(Saint Lueia)"
        },
        {
            "chineseName": "圣文森特岛 ",
            "country": "Saint Vincent",
            "region": "+1784",
            "shortName": "VC",
            "showName": "+1784(Saint Vincent)"
        },
        {
            "chineseName": "东萨摩亚(美)",
            "country": "Samoa Eastern",
            "region": "+684",
            "shortName": "　",
            "showName": "+684(Samoa Eastern)"
        },
        {
            "chineseName": "西萨摩亚",
            "country": "Samoa Western",
            "region": "+685",
            "shortName": "　",
            "showName": "+685(Samoa Western)"
        },
        {
            "chineseName": "圣马力诺",
            "country": "San Marino",
            "region": "+378",
            "shortName": "SM",
            "showName": "+378(San Marino)"
        },
        {
            "chineseName": "圣多美和普林西比",
            "country": "Sao Tome and Principe",
            "region": "+239",
            "shortName": "ST",
            "showName": "+239(Sao Tome and Principe)"
        },
        {
            "chineseName": "沙特阿拉伯",
            "country": "Saudi Arabia",
            "region": "+966",
            "shortName": "SA",
            "showName": "+966(Saudi Arabia)"
        },
        {
            "chineseName": "塞内加尔",
            "country": "Senegal",
            "region": "+221",
            "shortName": "SN",
            "showName": "+221(Senegal)"
        },
        {
            "chineseName": "塞舌尔",
            "country": "Seychelles",
            "region": "+248",
            "shortName": "SC",
            "showName": "+248(Seychelles)"
        },
        {
            "chineseName": "塞拉利昂",
            "country": "Sierra Leone",
            "region": "+232",
            "shortName": "SL",
            "showName": "+232(Sierra Leone)"
        },
        {
            "chineseName": "斯洛伐克",
            "country": "Slovakia",
            "region": "+421",
            "shortName": "SK",
            "showName": "+421(Slovakia)"
        },
        {
            "chineseName": "斯洛文尼亚 ",
            "country": "Slovenia",
            "region": "+386",
            "shortName": "SI",
            "showName": "+386(Slovenia)"
        },
        {
            "chineseName": "所罗门群岛",
            "country": "Solomon Is",
            "region": "+677",
            "shortName": "SB",
            "showName": "+677(Solomon Is)"
        },
        {
            "chineseName": "索马里",
            "country": "Somali",
            "region": "+252",
            "shortName": "SO",
            "showName": "+252(Somali)"
        },
        {
            "chineseName": "南非",
            "country": "South Africa",
            "region": "+27",
            "shortName": "ZA",
            "showName": "+27(South Africa)"
        },
        {
            "chineseName": "斯里兰卡",
            "country": "Sri Lanka",
            "region": "+94",
            "shortName": "LK",
            "showName": "+94(Sri Lanka)"
        },
        {
            "chineseName": "圣卢西亚",
            "country": "St.Lucia",
            "region": "+1758",
            "shortName": "LC",
            "showName": "+1758(St.Lucia)"
        },
        {
            "chineseName": "圣文森特",
            "country": "St.Vincent",
            "region": "+1784",
            "shortName": "VC",
            "showName": "+1784(St.Vincent)"
        },
        {
            "chineseName": "苏丹",
            "country": "Sudan",
            "region": "+249",
            "shortName": "SD",
            "showName": "+249(Sudan)"
        },
        {
            "chineseName": "苏里南",
            "country": "Suriname",
            "region": "+597",
            "shortName": "SR",
            "showName": "+597(Suriname)"
        },
        {
            "chineseName": "斯威士兰",
            "country": "Swaziland",
            "region": "+268",
            "shortName": "SZ",
            "showName": "+268(Swaziland)"
        },
        {
            "chineseName": "瑞典",
            "country": "Sweden",
            "region": "+46",
            "shortName": "SE",
            "showName": "+46(Sweden)"
        },
        {
            "chineseName": "瑞士",
            "country": "Switzerland ",
            "region": "+41",
            "shortName": "CH",
            "showName": "+41(Switzerland )"
        },
        {
            "chineseName": "叙利亚",
            "country": "Syria",
            "region": "+963",
            "shortName": "SY",
            "showName": "+963(Syria)"
        },
        {
            "chineseName": "塔吉克斯坦 ",
            "country": "Tajikstan",
            "region": "+992",
            "shortName": "TJ",
            "showName": "+992(Tajikstan)"
        },
        {
            "chineseName": "坦桑尼亚",
            "country": "Tanzania",
            "region": "+255",
            "shortName": "TZ",
            "showName": "+255(Tanzania)"
        },
        {
            "chineseName": "多哥",
            "country": "Togo",
            "region": "+228",
            "shortName": "TG",
            "showName": "+228(Togo)"
        },
        {
            "chineseName": "汤加",
            "country": "Tonga",
            "region": "+676",
            "shortName": "TO",
            "showName": "+676(Tonga)"
        },
        {
            "chineseName": "特立尼达和多巴哥",
            "country": "Trinidad and Tobago",
            "region": "+1809",
            "shortName": "TT",
            "showName": "+1809(Trinidad and Tobago)"
        },
        {
            "chineseName": "突尼斯",
            "country": "Tunisia",
            "region": "+216",
            "shortName": "TN",
            "showName": "+216(Tunisia)"
        },
        {
            "chineseName": "土耳其",
            "country": "Turkey",
            "region": "+90",
            "shortName": "TR",
            "showName": "+90(Turkey)"
        },
        {
            "chineseName": "土库曼斯坦 ",
            "country": "Turkmenistan",
            "region": "+993",
            "shortName": "TM",
            "showName": "+993(Turkmenistan)"
        },
        {
            "chineseName": "乌干达",
            "country": "Uganda",
            "region": "+256",
            "shortName": "UG",
            "showName": "+256(Uganda)"
        },
        {
            "chineseName": "乌克兰",
            "country": "Ukraine",
            "region": "+380",
            "shortName": "UA",
            "showName": "+380(Ukraine)"
        },
        {
            "chineseName": "阿拉伯联合酋长国",
            "country": "United Arab Emirates",
            "region": "+971",
            "shortName": "AE",
            "showName": "+971(United Arab Emirates)"
        },
        {
            "chineseName": "乌拉圭",
            "country": "Uruguay",
            "region": "+598",
            "shortName": "UY",
            "showName": "+598(Uruguay)"
        },
        {
            "chineseName": "乌兹别克斯坦",
            "country": "Uzbekistan",
            "region": "+233",
            "shortName": "UZ",
            "showName": "+233(Uzbekistan)"
        },
        {
            "chineseName": "委内瑞拉",
            "country": "Venezuela",
            "region": "+58",
            "shortName": "VE",
            "showName": "+58(Venezuela)"
        },
        {
            "chineseName": "也门",
            "country": "Yemen",
            "region": "+967",
            "shortName": "YE",
            "showName": "+967(Yemen)"
        },
        {
            "chineseName": "南斯拉夫",
            "country": "Yugoslavia",
            "region": "+381",
            "shortName": "YU",
            "showName": "+381(Yugoslavia)"
        },
        {
            "chineseName": "津巴布韦",
            "country": "Zimbabwe",
            "region": "+263",
            "shortName": "ZW",
            "showName": "+263(Zimbabwe)"
        },
        {
            "chineseName": "扎伊尔",
            "country": "Zaire",
            "region": "+243",
            "shortName": "ZR",
            "showName": "+243(Zaire)"
        },
        {
            "chineseName": "赞比亚",
            "country": "Zambia",
            "region": "+260",
            "shortName": "ZM",
            "showName": "+260(Zambia)"
        }
    ],
}