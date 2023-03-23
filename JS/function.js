let checkLogin = false;

function Cart(idProd, idSize, amount, price) {
  this.idProd = idProd;
  this.amount = amount;
  this.idSize = idSize;
  this.price = price;
}

function Customer(
  id,
  name,
  number_phone,
  username,
  password,
  sex,
  birth_day,
  address = "",
  image = "",
  cart = [],
  status = "Còn hoạt động"
) {
  this.id = id;
  this.name = name;
  this.number_phone = number_phone;
  this.username = username;
  this.password = password;
  this.sex = sex;
  this.birth_day = birth_day;
  this.address = address;
  this.image = image;
  this.cart = cart;
  this.status = status;
  this.date_init = getCurrentDate();
}

function proInStock(amount, idInput, idProd, idSize, price) {
  this.amount = amount;
  this.idInput = idInput;
  this.idProd = idProd;
  this.idSize = idSize;
  this.price = price;
}

function km(idProd, discount_percent, discount_price) {
  this.idProd = idProd;
  this.discount_percent = discount_percent;
  this.discount_price = discount_price;
}

function Size(id, name) {
  this.id = id;
  this.name = name;
}

function Receipt(id, idCus, liProd, nameCustomer, date_init, address, status) {
  this.id = id;
  this.idCustomer = idCus;
  this.idStaff = "";
  this.list_prod = liProd;
  this.nameCustomer = nameCustomer;
  this.date_init = date_init;
  this.date_confirm = "";
  this.address = address;
  this.status = status;
}
function calculated(price) {
  price = price.toString();
  let ar = new Array();
  for (let i = 0; i < price.length; i++) {
    if (i % 3 == 0 && i != 0) {
      ar.push(".");
    }
    ar.push(price[price.length - i - 1]);
  }
  price = "";
  for (let i = ar.length - 1; i >= 0; i--) {
    price += ar[i];
  }
  return price;
}
let arr = {
  product: [
    {
      id: "PKBT0000",
      name: "Balo Rivacase",
      made_in: "Đức",
      description: "",
      price: "799000",
      images: [
        "balo-rivacase-7560-m-grey-969-01594277351.jpeg",
        "rivacase-7560-m-grey-2.jpeg",
        "rivacase-7560-m-grey.jpeg",
        "rivacase-7560-m-grey-4.jpeg",
        "rivacase-7560-m-grey-7.jpeg",
      ],
      clasify: ["phụ kiện", "balo"],
      status: "1",
    },
    {
      id: "PKBT0001",
      name: "Balo Kmore The Abel Backpack",
      made_in: "Việt Nam",
      description: "",
      price: "500000",
      images: [
        "balo-kmore-the-abel-backpack-km-tabp003-m-dark-tan-13540-51663296227.jpeg",
        "balo-kmore-the-abel-backpack-km-tabp003-m-dark-tan-13540-41663296227.jpeg",
        "balo-kmore-the-abel-backpack-km-tabp003-m-dark-tan-13540-31663296227.jpeg",
        "balo-kmore-the-abel-backpack-km-tabp003-m-dark-tan-13540-01663296226.jpeg",
        "balo-kmore-the-abel-backpack-km-tabp003-m-dark-tan-13540-11663296226.jpeg",
      ],
      clasify: ["phụ kiện", "balo"],
      status: "1",
    },
    {
      id: "PKBT0002",
      name: "Balo Seliux F4 Phantom II Backpack",
      made_in: "Việt Nam",
      description: "",
      price: "750000",
      images: [
        "seliux-f4-phantom-ii-backpack-m-black-red-2.jpeg",
        "seliux-f4-phantom-ii-backpack-m-black-red.jpeg",
        "seliux-f4-phantom-ii-backpack-m-black-red-3.jpeg",
        "seliux-f4-phantom-ii-backpack-m-black-red-4.jpeg",
        "seliux-f4-phantom-ii-backpack-m-black-red-5.jpeg",
      ],
      clasify: ["phụ kiện", "balo"],
      status: "1",
    },
    {
      id: "PKBT0003",
      name: "Balo Rivacase 8365",
      made_in: "Đức",
      description: "",
      price: "1950000",
      images: [
        "balo-rivacase-8365-m-blue-7632-01653894040.jpeg",
        "rivacase-8365-m-blue.jpeg",
        "rivacase-8365-m-blue-3.jpeg",
        "rivacase-8365-m-blue-4.jpeg",
        "rivacase-8365-m-blue-5.jpeg",
      ],
      clasify: ["phụ kiện", "balo"],
      status: "1",
    },
    {
      id: "PKBT0004",
      name: "Balo Herschel Heritage Standard",
      made_in: "Canada",
      description: "",
      price: "2299000",
      images: [
        "balo-herschel-heritage-standard-15-backpack-m-navy-1-12931-21638264487.jpeg",
        "balo-herschel-heritage-standard-15-backpack-m-navy-1-12931-01638264486.jpeg",
        "balo-herschel-heritage-standard-15-backpack-m-navy-1-12931-31638264487.jpeg",
        "balo-herschel-heritage-standard-15-backpack-m-navy-1-12931-11638264486.jpeg",
      ],
      clasify: ["phụ kiện", "balo"],
      status: "1",
    },
    {
      id: "PKBT0005",
      name: "Balo AGVA Stella",
      made_in: "Singapore",
      description: "",
      price: "1050000",
      images: [
        "agva-stella-13-3-ltb351denimblue-m-blue.jpeg",
        "agva-stella-13-3-ltb351denimblue-m-blue-2.jpeg",
        "agva-stella-13-3-ltb351denimblue-m-blue-3.jpeg",
        "agva-stella-13-3-ltb351denimblue-m-blue-4.jpeg",
        "agva-stella-13-3-ltb351denimblue-m-blue-5.jpeg",
        "agva-stella-13-3-ltb351denimblue-m-blue-6.jpeg",
      ],
      clasify: ["phụ kiện", "balo"],
      status: "1",
    },
    {
      id: "PKBT0006",
      name: "Balo Parkland Edison",
      made_in: "Việt Nam",
      description: "",
      price: "1099000",
      images: [
        "balo-parkland-edison-20020-00364-os-s-peachy-12645-01640748905.jpeg",
        "balo-parkland-edison-20020-00364-os-s-peachy-12645-01640748910.jpeg",
      ],
      clasify: ["phụ kiện", "balo"],
      status: "1",
    },
    {
      id: "PKBT0007",
      name: "Balo Tomtoc",
      made_in: "Mỹ",
      description: "",
      price: "1079000",
      images: [
        "tomtoc-a71-d01x10-s-black-purple.jpeg",
        "tomtoc-a71-d01x10-s-black-purple-2.jpeg",
        "tomtoc-a71-d01x10-s-black-purple-3.jpeg",
        "tomtoc-a71-d01x10-s-black-purple-4.jpeg",
      ],
      clasify: ["phụ kiện", "balo"],
      status: "1",
    },
    {
      id: "PKBT0008",
      name: "Balo Reeyee RY103B",
      made_in: "Trung Quốc",
      description: "",
      price: "1320000",
      images: [
        "reeyee-ry1020-17-m-black.jpeg",
        "reeyee-ry1020-17-m-black-4.jpeg",
        "reeyee-ry1020-17-m-black-2.jpeg",
        "reeyee-ry1020-17-m-black-3.jpeg",
      ],
      clasify: ["phụ kiện", "balo"],
      status: "1",
    },
    {
      id: "PKBT0009",
      name: "Balo Solo Re:cover",
      made_in: "Mỹ",
      description: "",
      price: "1550000",
      images: [
        "balo-solo-recover-15-6-ubn761-10-backpack-m-grey-13270-01655281810.jpeg",
        "balo-solo-recover-15-6-ubn761-10-backpack-m-grey-13270-21655281810.jpeg",
        "balo-solo-recover-15-6-ubn761-10-backpack-m-grey-13270-01655283881.jpeg",
        "balo-solo-recover-15-6-ubn761-10-backpack-m-grey-13270-41655281811.jpeg",
        "balo-solo-recover-15-6-ubn761-10-backpack-m-grey-13270-51655281811.jpeg",
        "balo-solo-recover-15-6-ubn761-10-backpack-m-grey-13270-71655281811.jpeg",
        "balo-solo-recover-15-6-ubn761-10-backpack-m-grey-13270-81655281811.jpeg",
        "balo-solo-recover-15-6-ubn761-10-backpack-m-grey-13270-91655281811.jpeg",
      ],
      clasify: ["phụ kiện", "balo"],
      status: "1",
    },
    {
      id: "PKBT0010",
      name: "Balo Mikkor The Edwin Backpack",
      made_in: "Việt Nam",
      description: "",
      price: "649000",
      images: [
        "mikkor-the-edwin-backpack-m-black.jpeg",
        "mikkor-the-edwin-backpack-m-black-2.jpeg",
        "mikkor-the-edwin-backpack-m-black-3.jpeg",
        "mikkor-the-edwin-backpack-m-black-4.jpeg",
        "mikkor-the-edwin-backpack-m-black-5.jpeg",
        "mikkor-the-edwin-backpack-m-black-6.jpeg",
      ],
      clasify: ["phụ kiện", "balo"],
      status: "1",
    },
    {
      id: "PKBT0011",
      name: "Balo Beam Backpack Solar Power Backpack K9386W",
      made_in: "Trung Quốc",
      description: "",
      price: "3718000",
      images: [
        "beam-backpack-solar-power-backpack-k9386w-m-black-7.jpeg",
        "beam-backpack-solar-power-backpack-k9386w-m-black.jpeg",
        "beam-backpack-solar-power-backpack-k9386w-m-black-8.jpeg",
        "beam-backpack-solar-power-backpack-k9386w-m-black-5.jpeg",
        "beam-backpack-solar-power-backpack-k9386w-m-black-10.jpeg",
        "beam-backpack-solar-power-backpack-k9386w-m-black-4.jpeg",
        "beam-backpack-solar-power-backpack-k9386w-m-black-3.jpeg",
        "beam-backpack-solar-power-backpack-k9386w-m-black-2.jpeg",
        "beam-backpack-solar-power-backpack-k9386w-m-black-6.jpeg",
        "beam-backpack-solar-power-backpack-k9386w-m-black-9.jpeg",
      ],
      clasify: ["phụ kiện", "balo"],
      status: "1",
    },
    {
      id: "PKBT0012",
      name: "Balo Simplecarry E-City 2",
      made_in: "Việt Nam",
      description: "",
      price: "690000",
      images: [
        "balo-simplecarry-e-city-2-m-flower-11966-11608085313.jpeg",
        "balo-simplecarry-e-city-2-m-flower-11966-01608085312.jpeg",
        "balo-simplecarry-e-city-2-m-flower-11966-21608085313.jpeg",
        "balo-simplecarry-e-city-2-m-flower-11966-31608085313.jpeg",
        "balo-simplecarry-e-city-2-m-flower-11966-41608085313.jpeg",
      ],
      clasify: ["phụ kiện", "balo"],
      status: "1",
    },
    {
      id: "PKBT0013",
      name: "Túi đeo chéo YUUMY YN98D",
      made_in: "Việt Nam",
      description: "",
      price: "570000",
      images: [
        "tui-deo-cheo-khoa-nhan-yuumy-yn98-FADODA-Quan-12-Nguyen-anh-thu-5-897x897.jpeg",
        "tui-deo-cheo-khoa-nhan-yuumy-yn98-FADODA-Quan-12-Nguyen-anh-thu-6-1-897x897.jpeg",
        "tui-deo-cheo-khoa-nhan-yuumy-yn98-FADODA-Quan-12-Nguyen-anh-thu-8-1-897x897.jpeg",
        "z3258710857339_3161b6dcad7d3b0508f525d035acda4b-1-897x897.jpeg",
      ],
      clasify: ["phụ kiện", "Túi xách"],
      status: "1",
    },
    {
      id: "PKDH0000",
      name: "Đồng Hồ Thông Minh Fossil FTW6036",
      made_in: "Mỹ",
      description: "",
      price: "7970000",
      images: [
        "FTW6036_Desktop_1.jpeg",
        "FTW6036_Desktop_2.jpeg",
        "FTW6036_Desktop_3.jpeg",
      ],
      clasify: ["phụ kiện", "Đồng hồ"],
      status: "1",
    },
    {
      id: "PKDH0001",
      name: "PAGINI PA002218",
      made_in: "Việt Nam",
      description: "",
      price: "692000",
      images: [
        "545b27db56729b14f4f0b02506075461.jpeg",
        "d8bf4f6eac84fb7bad9c2f1f91237e08.jpeg",
        "fa7ead3b6720d6d1d368efc2e7670185.jpeg",
        "481a5d4d5a205d330f6781a03282a4ff.jpeg",
        "86d4b167fbfe62d3de53905264e14913.jpeg",
        "abd2a43695ce8c876253f7f5f4235c2f.jpeg",
      ],
      clasify: ["phụ kiện", "Đồng hồ"],
      status: "1",
    },
    {
      id: "AOCTNU00",
      name: "DSS CROPTOP WASH",
      made_in: "Việt Nam",
      description: "",
      price: "692000",
      images: [
        "ao-croptop-local-brand-davies-nu.jpeg",
        "ao-croptop-local-brand-davies-dep.jpeg",
        "ao-croptop-nu-sign.jpeg",
        "ao-croptop-local-brand-nu-dep.jpeg",
      ],
      clasify: ["Áo", "Croptop"],
      status: "1",
    },
    {
      id: "AOCTNU01",
      name: "DSS CROPTOP SIGN",
      made_in: "Việt Nam",
      description: "",
      price: "210000",
      images: [
        "o-nu-wash-croptop-local-brand-dep-7.jpeg",
        "o-nu-wash-croptop-local-brand-dep-5.jpeg",
        "o-nu-wash-croptop-local-brand-dep-1.jpeg",
        "o-nu-wash-croptop-local-brand-dep-2.jpeg",
        "o-nu-wash-croptop-local-brand-dep-3.jpeg",
      ],
      clasify: ["Áo", "Croptop"],
      status: "1",
    },
    {
      id: "QUQTNA00",
      name: "Quần Tây Slim-fit ICON DENIM",
      made_in: "Việt Nam",
      description: "",
      price: "400000",
      images: [
        "c0d0aac7c1bf69e6ec647881f3616e36.jpeg",
        "fe4988db9c85a7dc761c5912b7bc01c9.jpeg",
        "d5f280cdae449338d846d4633ddb36b3.jpeg",
        "9d347f0826f26b34a9c4f5b99ef8a652.jpeg",
        "ebf2f138a0326c16f921e6f9b8f460f0.jpeg",
      ],
      clasify: ["Quần", "Quần tây"],
      status: "1",
    },
    {
      id: "QUQTNA01",
      name: "Quần Âu Nam Phối Cạp Chun",
      made_in: "Việt Nam",
      description: "",
      price: "260000",
      images: [
        "a2d2154b263d7ad0112b70473995a86c.jpeg",
        "948559836b645ec7a72d292e7277499c_tn.jpeg",
      ],
      clasify: ["Quần", "Quần tây"],
      status: "1",
    },
    {
      id: "AOATNU00",
      name: "DSS TEE TRAVELHOLIC",
      made_in: "Việt Nam",
      description: "",
      price: "250000",
      images: [
        "ao-thun-nu-local-brand-dep-davies.jpeg",
        "56c5a6f-d65e-4f50-9539-174296458b1d.jpeg",
        "6dfca21-8c81-4749-a8a3-66d4a2b33fd1.jpeg",
        "ao-thun-local-brand-nu-tay-lo.jpeg",
      ],
      clasify: ["Áo", "Thun"],
      status: "1",
    },
    {
      id: "AOHDNU00",
      name: "DSS HOODIE D CARTOON",
      made_in: "Việt Nam",
      description: "",
      price: "320000",
      images: [
        "ao-khoac-mau-tim-hoodie-local-brand.jpeg",
        "hoodie-mau-tim-local-brand.jpeg",
        "khoac-hoodie-mau-tim-nu-local-brand.jpeg",
        "ao-khoac-hoodie-zip-mau-tim.jpeg",
        "ao-khoac-hoodie-nu-dep.jpeg",
      ],
      clasify: ["Áo", "Hoodie"],
      status: "1",
    },
    {
      id: "AOHDNU01",
      name: "DSS HOODIE ZIPPER",
      made_in: "Việt Nam",
      description: "",
      price: "450000",
      images: ["zipper-hoodie-pink.jpeg", "zipper-hoodie-pink-2.jpeg"],
      clasify: ["Áo", "Hoodie"],
      status: "1",
    },
  ],
  promote: [
    {
      id: "SALE0000",
      name: "Sale 25%",
      image: "",
      content: "",
      discount_price: "0",
      discount_percent: "25",
      date_begin: "18/02/2022",
      date_end: "24/12/2022",
      products: [{ id: "PKBT0000" }, { id: "PKDH0001" }],
      status: "1",
    },
    {
      id: "SALE0001",
      name: "Sale 12%",
      image: "",
      content: "",
      discount_price: "0",
      discount_percent: "12",
      date_begin: "18/02/2022",
      date_end: "24/12/2022",
      products: [{ id: "QUQTNA01" }],
      status: "1",
    },
    {
      id: "SALE0002",
      name: "Sale 35%",
      image: "",
      content: "",
      discount_price: "0",
      discount_percent: "35",
      date_begin: "18/02/2022",
      date_end: "24/12/2022",
      products: [{ id: "PKBT0007" }, { id: "PKBT0011" }, { id: "QUQT0000" }],
      status: "1",
    },
    {
      id: "SALE0003",
      name: "Sale 50%",
      image: "",
      content: "",
      discount_price: "0",
      discount_percent: "50",
      date_begin: "04/05/2022",
      date_end: "01/01/2023",
      products: [{ id: "PKDH0000" }],
      status: "1",
    },
    {
      id: "SALE0004",
      name: "Sale 10%",
      image: "",
      content: "",
      discount_price: "0",
      discount_percent: "10",
      date_begin: "20/06/2022",
      date_end: "24/12/2022",
      products: [{ id: "AOHDNU01" }],
      status: "1",
    },
    {
      id: "SALE0005",
      name: "sale 60%",
      content: "",
      date_begin: "28/02/2022",
      date_end: "25/12/2022",
      image: "",
      products: [],
      discount_percent: "60",
      discount_price: "0",
    },
    {
      id: "SALE0006",
      name: "Sale 300k",
      content: "sdfsdf",
      date_begin: "12/02/2020",
      date_end: "12/02/2022",
      image: "",
      products: [],
      discount_percent: "0",
      discount_price: "300000",
    },
    {
      id: "SALE0006",
      name: "sale 30%",
      content: "sdfsdf",
      date_begin: "12/02/2020",
      date_end: "12/02/2022",
      image: "",
      products: [],
      discount_percent: "30",
      discount_price: "0",
    },
  ],
  size: [
    {
      id: "AS",
      name: "S",
      shoulderIndex: "42",
      backIndex: "58",
      bellyIndex: "75",
      legLength: "",
      armLength: "45",
      thighLength: "",
      calfIndex: "",
      buttIndex: "",
    },
    {
      id: "AM",
      name: "M",
      shoulderIndex: "42",
      backIndex: "58",
      bellyIndex: "75",
      legLength: "",
      armLength: "45",
      thighLength: "",
      calfIndex: "",
      buttIndex: "",
    },
    {
      id: "AL",
      name: "L",
      shoulderIndex: "42",
      backIndex: "58",
      bellyIndex: "75",
      legLength: "",
      armLength: "45",
      thighLength: "",
      calfIndex: "",
      buttIndex: "",
    },
    {
      id: "QS",
      name: "S",
      shoulderIndex: "",
      backIndex: "",
      bellyIndex: "",
      legLength: "60",
      armLength: "",
      thighLength: "32",
      calfIndex: "22",
      buttIndex: "80",
    },
    {
      id: "QM",
      name: "M",
      shoulderIndex: "",
      backIndex: "",
      bellyIndex: "",
      legLength: "64",
      armLength: "",
      thighLength: "36",
      calfIndex: "26",
      buttIndex: "85",
    },
    {
      id: "QL",
      name: "L",
      shoulderIndex: "",
      backIndex: "",
      bellyIndex: "",
      legLength: "68",
      armLength: "",
      thighLength: "40",
      calfIndex: "30",
      buttIndex: "90",
    },
  ],
  largeClassify: [
    {
      id: "AO",
      name: "Áo",
      miniClassify: [
        { id: "AOCTNU", name: "Áo croptop" },
        { id: "AOSMNU", name: "Áo sơ mi" },
        { id: "AOHDNU", name: "Áo hoodie" },
        { id: "AOATNU", name: "Áo thun" },
        { id: "AOPPNU", name: "Áo peter pan" },
        { id: "AOAKNA", name: "Áo khoác" },
        { id: "AOAVNA", name: "Áo vest" },
        { id: "AOHDNA", name: "Áo hoodie" },
        { id: "AOATNA", name: "Áo thun" },
        { id: "AOSMNA", name: "Áo sơ mi" },
      ],
    },
    {
      id: "QU",
      name: "Quần",
      miniClassify: [
        { id: "QUCVNU", name: "Chân váy" },
        { id: "QUQSNU", name: "Quần skinny" },
        { id: "QUQLNU", name: "Quần legging" },
        { id: "QUGVNU", name: "Quần giả váy" },
        { id: "QUQBNU", name: "Quần baggy" },
        { id: "QUSHNU", name: "Quần short" },
        { id: "QUOSNU", name: "Quần ống suông" },
        { id: "QUQTNA", name: "Quần Tây" },
        { id: "QUQKNA", name: "Quần Kaki" },
        { id: "QUQBNA", name: "Quần Baggy" },
        { id: "QUSHNA", name: "Quần short" },
        { id: "QUTHNA", name: "Quần túi hộp" },
      ],
    },
    // ,
    // {
    //   id: "PK",
    //   name: "Phụ kiện nam - nữ",
    //   miniClassify: [
    //     { id: "PKDH", name: "Đồng hồ" },
    //     { id: "PKTL", name: "Thắt lưng" },
    //     { id: "PKBT", name: "Balo / túi xách" },
    //   ],
    // },
  ],
  receipt: [
    {
      id: "RE0001",
      idCustomer: "KH000001",
      idStaff: "",
      list_prod: [
        {
          idProd: "PKBT0008",
          idSize: "",
          amount: "3",
          price: "3960000",
        },
      ],
      nameCustomer: "Nguyễn Minh Thao",
      date_init: "29/10/2022 09:09:28",
      date_confirm: "",
      address: "Q5-TP.HCM",
      status: "Chờ xác nhận",
    },
    {
      id: "RE0002",
      idCustomer: "KH000001",
      idStaff: "",
      list_prod: [
        {
          idProd: "PKBT0005",
          idSize: "",
          amount: "9",
          price: "9450000",
        },
        {
          idProd: "PKBT0012",
          idSize: "",
          amount: "2",
          price: "1380000",
        },
        {
          idProd: "AOCTNU00",
          idSize: "AL",
          amount: "4",
          price: "2768000",
        },
        {
          idProd: "PKDH0001",
          idSize: "",
          amount: "2",
          price: "1038000",
        },
      ],
      nameCustomer: "Nguyễn Minh Thao",
      date_init: "30/10/2022 09:20:08",
      date_confirm: "",
      address: "TP.HCM",
      status: "chờ xác nhận",
    },
    {
      id: "RE0003",
      idCustomer: "KH000001",
      idStaff: "",
      list_prod: [
        { idProd: "PKBT0005", idSize: "", amount: 3, price: 3150000 },
      ],
      nameCustomer: "Nguyễn Minh Thao",
      date_init: "01/12/2022 09:50:34",
      date_confirm: "",
      address: "TP.HCM",
      status: "Chờ xác nhận",
    },
    {
      id: "RE0004",
      idCustomer: "KH000001",
      idStaff: "",
      list_prod: [
        { idProd: "PKBT0008", idSize: "", amount: 1, price: 1320000 },
      ],
      nameCustomer: "Nguyễn Minh Thao",
      date_init: "02/12/2022 09:51:30",
      date_confirm: "",
      address: "TP.HCM",
      status: "Chờ xác nhận",
    },
    {
      id: "RE0005",
      idCustomer: "KH000001",
      idStaff: "",
      list_prod: [{ idProd: "PKBT0012", idSize: "", amount: 1, price: 690000 }],
      nameCustomer: "Nguyễn Minh Thao",
      date_init: "03/12/2022 09:51:42",
      date_confirm: "",
      address: "TP.HCM",
      status: "Chờ xác nhận",
    },
    {
      id: "RE0006",
      idCustomer: "KH000001",
      idStaff: "",
      list_prod: [{ idProd: "PKDH0001", idSize: "", amount: 1, price: 692000 }],
      nameCustomer: "Nguyễn Minh Thao",
      date_init: "04/12/2022 09:52:11",
      date_confirm: "",
      address: "TP.HCM",
      status: "Chờ xác nhận",
    },
    {
      id: "RE0007",
      idCustomer: "KH000001",
      idStaff: "",
      list_prod: [
        { idProd: "AOHDNU00", amount: 1, idSize: "AL", price: 320000 },
      ],
      nameCustomer: "Nguyễn Minh Thao",
      date_init: "05/12/2022 10:01:25",
      date_confirm: "",
      address: "TP.HCM",
      status: "Chờ xác nhận",
    },
    {
      id: "RE0008",
      idCustomer: "KH000001",
      idStaff: "",
      list_prod: [
        { idProd: "AOCTNU00", idSize: "AL", amount: 2, price: 1384000 },
      ],
      nameCustomer: "Nguyễn Minh Thao",
      date_init: "06/12/2022 07:48:06",
      date_confirm: "",
      address: "Q7-TP.HCM",
      status: "Chờ xác nhận",
    },
    {
      id: "RE0009",
      idCustomer: "KH000001",
      idStaff: "",
      list_prod: [
        { idProd: "AOHDNU00", amount: 1, idSize: "AL", price: 320000 },
      ],
      nameCustomer: "Nguyễn Minh Thao",
      date_init: "07/12/2022 10:54:08",
      date_confirm: "",
      address: "TP.HCM",
      status: "Chờ xác nhận",
    },
  ],
  customer: [
    {
      id: "KH000001",
      name: "Nguyễn Minh Thao",
      date_init: "20:58 25/10/2022",
      username: "thaonguyen",
      password: "290702",
      sex: "Nam",
      birth_day: "18/02/2002",
      number_phone: "0395932776",
      image: " ",
      address: "",
      cart: [],
      status: "Đã khóa",
    },
    {
      id: "KH000002",
      name: " Nguyễn Văn Sỹ Phú",
      date_init: "20:58 25/10/2022",
      username: "syphu",
      password: "123123",
      sex: "Nam",
      birth_day: "30-11-2002",
      number_phone: "0594155555",
      image: " ",
      address: "",
      cart: [],
      status: "Đã khóa",
    },
    {
      id: "KH000003",
      name: "Trần Đức An",
      date_init: "20:58 25/10/2022",
      username: "ducan",
      password: "123123",
      sex: "Nam",
      birth_day: "18-04-2002",
      number_phone: "0494142222",
      image: " ",
      address: "",
      cart: [],
      status: "Đã khóa",
    },
    {
      id: "KH000004",
      name: "Vòng Cỏng Mềnh",
      date_init: "20:58 10/10/2022",
      username: "phuongvi",
      password: "123123",
      sex: "Nam",
      birth_day: "18-02-2002",
      number_phone: "0394142181",
      image: " ",
      address: "",
      cart: [],
      status: "Đã khóa",
    },
    {
      id: "KH000005",
      name: "Do Minh",
      date_init: "20:58 24-10-2022",
      username: "dominh",
      password: "123123",
      sex: "Nam",
      birth_day: "16/02/2002",
      number_phone: "0394142777",
      image: " ",
      address: "",
      cart: [],
      status: "Đã khóa",
    },
    {
      id: "KH000006",
      name: "Mỹ Hồ",
      date_init: "20:58 30/10/2022",
      username: "myho",
      password: "123123",
      sex: "Nữ",
      birth_day: "12/2/2002",
      number_phone: "0394147881",
      image: " ",
      address: "",
      cart: [],
      status: "Còn hoạt động",
    },
    {
      id: "KH000007",
      name: "Ngọc Nhi",
      date_init: "20:58 25/10/2022",
      username: "nhi",
      password: "123123",
      sex: "Nữ",
      birth_day: "09/07/1995",
      number_phone: "039232181",
      image: " ",
      address: "",
      cart: [],
      status: "còn hoạt động",
    },
    {
      id: "KH000008",
      name: "Thanh Nhân",
      date_init: "20:58 25/10/2022",
      username: "nhan",
      password: "123123",
      sex: "Nam",
      birth_day: "11/06/2002",
      number_phone: "03778845673",
      image: " ",
      address: "",
      cart: [],
      status: "còn hoạt động",
    },
    {
      id: "KH000009",
      name: "Ngô Đạt",
      date_init: "20:58 12/12/2022",
      username: "ngodat",
      password: "123456",
      sex: "Nam",
      birth_day: "11/06/2002",
      number_phone: "01869128510",
      image: " ",
      address: "",
      cart: [],
      status: "còn hoạt động",
    },
  ],
  prodInStock: [
    {
      idInput: "NHAP0000",
      idProd: "PKBT0000",
      idSize: "",
      amount: "300",
      price: "799000",
    },
    {
      idInput: "NHAP0001",
      idProd: "PKBT0001",
      idSize: "",
      amount: "350",
      price: "500000",
    },
    {
      idInput: "NHAP0002",
      idProd: "PKBT0002",
      idSize: "",
      amount: "100",
      price: "750000",
    },
    {
      idInput: "NHAP0003",
      idProd: "PKBT0003",
      idSize: "",
      amount: "111",
      price: "1950000",
    },
    {
      idInput: "NHAP0004",
      idProd: "PKBT0004",
      idSize: "",
      amount: "119",
      price: "2299000",
    },
    {
      idInput: "NHAP0005",
      idProd: "PKBT0005",
      idSize: "",
      amount: "46",
      price: "1050000",
    },
    {
      idInput: "NHAP0006",
      idProd: "PKBT0006",
      idSize: "",
      amount: "69",
      price: "1099000",
    },
    {
      idInput: "NHAP0007",
      idProd: "PKBT0007",
      idSize: "",
      amount: "697",
      price: "1079000",
    },
    {
      idInput: "NHAP0008",
      idProd: "PKBT0008",
      idSize: "",
      amount: "677",
      price: "1320000",
    },
    {
      idInput: "NHAP0009",
      idProd: "PKBT0009",
      idSize: "",
      amount: "634",
      price: "1550000",
    },
    {
      idInput: "NHAP0010",
      idProd: "PKBT00010",
      idSize: "",
      amount: "630",
      price: "649000",
    },
    {
      idInput: "NHAP0011",
      idProd: "PKBT00011",
      idSize: "",
      amount: "63",
      price: "3718000",
    },
    {
      idInput: "NHAP0012",
      idProd: "PKBT0012",
      idSize: "",
      amount: "445",
      price: "690000",
    },
    {
      idInput: "NHAP0013",
      idProd: "PKBT0013",
      idSize: "",
      amount: "845",
      price: "570000",
    },
    {
      idInput: "NHAP0014",
      idProd: "PKDH0000",
      idSize: "",
      amount: "85",
      price: "7970000",
    },
    {
      idInput: "NHAP0015",
      idProd: "PKDH0001",
      idSize: "",
      amount: "2001",
      price: "692000",
    },
    {
      idInput: "NHAP0016",
      idProd: "AOCTNU00",
      idSize: "AS",
      amount: "2001",
      price: "692000",
    },
    {
      idInput: "NHAP0016",
      idProd: "AOCTNU00",
      idSize: "AM",
      amount: "501",
      price: "692000",
    },
    {
      idInput: "NHAP0016",
      idProd: "AOCTNU00",
      idSize: "AL",
      amount: "5001",
      price: "692000",
    },
    {
      idInput: "NHAP0017",
      idProd: "QUQTNA00",
      idSize: "QS",
      amount: "5501",
      price: "400000",
    },
    {
      idInput: "NHAP0018",
      idProd: "QUQTNA01",
      idSize: "QS",
      amount: "7561",
      price: "260000",
    },
    {
      idInput: "NHAP0019",
      idProd: "AOATNU00",
      idSize: "AM",
      amount: "901",
      price: "250000",
    },
    {
      idInput: "NHAP0020",
      idProd: "AOHDNU00",
      idSize: "AL",
      amount: "90",
      price: "320000",
    },
    {
      idInput: "NHAP0021",
      idProd: "AOHDNU01",
      idSize: "AM",
      amount: "19",
      price: "450000",
    },
    {
      idInput: "NHAP0022",
      idProd: "AOCTNU01",
      idSize: "AS",
      amount: "200",
      price: "210000",
    },
    {
      idInput: "NHAP0023",
      idProd: "AOCTNU00",
      idSize: "AS",
      amount: "5001",
      price: "692000",
    },
    {
      idInput: "NHAP0024",
      idProd: "AOCTNU00",
      idSize: "AM",
      amount: "5002",
      price: "692000",
    },
    {
      idInput: "NHAP0025",
      idProd: "AOCTNU00",
      idSize: "AL",
      amount: "501",
      price: "692000",
    },
    {
      idInput: "0NaN",
      idProd: "AOCTNU0002",
      idSize: "AOAsdf",
      amount: "868",
      price: "345345",
    },
    {
      idInput: "0NaN",
      idProd: "AOHDNU01",
      idSize: "AOAsdf",
      amount: "868",
      price: "345345",
    },
    {
      idInput: "NHAP0002",
      idProd: "PKBT0003",
      amount: "234",
      price: "35435",
    },
    {
      idInput: "NHAP0003",
      idProd: "PKBT0002",
      amount: "35345",
      price: "35",
    },
  ],
  staff: [
    {
      id: "NV0001",
      name: "An",
      date_init: "02/12/2022 20:54",
      username: "an.baka",
      password: "123123",
      sex: "Nam",
      birth_day: "13/12/2003",
      number_phone: "0797816348",
      address: "",
      status: "còn làm việc",
      position: "Quản lý",
    },
    {
      id: "NV0002",
      name: "Thao",
      date_init: "02/12/2022 20:54",
      username: "thao",
      password: "123123",
      sex: "Nam",
      birth_day: "29/07/2002",
      number_phone: "0396290702",
      address: "",
      status: "còn làm việc",
      position: "Quản lý",
    },
    {
      id: "NV0003",
      name: "Phú",
      date_init: "02/12/2022 20:54",
      username: "nvsyphu",
      password: "123123",
      sex: "Nam",
      birth_day: "30/11/2002",
      number_phone: "0334171858",
      address: "",
      status: "còn làm việc",
      position: "Quản lý",
    },
    {
      id: "NV0004",
      name: "Mềnh",
      date_init: "02/12/2022 20:54",
      username: "menh01",
      password: "123123",
      sex: "Nam",
      birth_day: "18/02/2002",
      number_phone: "0394142081",
      address: "",
      status: "còn làm việc",
      position: "Quản lý",
    },
  ],
  input_product: [
    {
      id: "NHAP0001",
      idStaff: "NV0001",
      date_input: "06/10/2022 19:09:46",
      detail: [
        {
          id: "PKBT0000",
          name: "Balo Rivacase",
          amount: "6",
          price: "324344",
          total_price: "1946064",
        },
      ],
      note: "sdfjksf",
    },
    {
      id: "NHAP0002",
      idStaff: "NV0001",
      date_input: "06/10/2022 19:11:43",
      detail: [
        {
          id: "PKBT0000",
          name: "Balo Rivacase",
          amount: "3",
          price: "324234",
          total_price: "972702",
        },
      ],
      note: "",
    },
    {
      id: "NHAP0003",
      idStaff: "NV0001",
      date_input: "03/11/2022 10:36:43",
      detail: [
        {
          id: "PKBT0002",
          name: "Balo Seliux F4 Phantom II Backpack",
          amount: "35345",
          price: "35",
          total_price: "1237075",
        },
      ],
      note: "",
    },
  ],
  history: [
    {
      name: "Admin chúa",
      content: "ngày hôm nay admin chúa đã tạo ra thứ phiền não này",
      date: "21:00 11/11/2022",
    },
    {
      name: "Admin chúa",
      content: "ngày hôm nay admin chúa đã tạo ra thứ phiền não này",
      date: "21:00 11/11/2022",
    },
    {
      name: "Admin chúa",
      content: "ngày hôm nay admin chúa đã tạo ra thứ phiền não này",
      date: "21:00 11/11/2022",
    },
    {
      name: "Admin chúa",
      content: "ngày hôm nay admin chúa đã tạo ra thứ phiền não này",
      date: "21:00 11/11/2022",
    },
    {
      name: "Mềnh",
      content: "ngày hôm nay Mềnh đã tạo ra thứ phiền não này",
      date: "21:00 11/11/2022",
    },
  ],
  variable: [
    {
      id: "gh_tuoi",
      gh_duoi: "16",
      gh_tren: "120",
    },
    {
      id: "cons_sdt",
      var1: "+84",
      var2: "0",
      var3: "0123456789",
    },
    {
      id: "ki_tu",
      var1: "65",
      var2: "90",
      var3: "97",
      var4: "122",
      var5: "239",
    },
    {
      id: "gh_tuoi_nv",
      gh_duoi: "18",
      gh_tren: "120",
    },
  ],
};
let data = new Array();
if (localStorage.getItem("data") == null) {
  localStorage.setItem("data", JSON.stringify(arr));
}
// function testthoi() {
//   document.getElementById("inp-firstname").value = "123";
//   document.getElementById("inp-lastname").value = "123";
//   document.getElementById("inp-username").value = "123";
//   document.getElementById("passwd-regis").value = "123";
//   document.getElementById("same-passwd").value = "123";
//   document.getElementById("birthday").value = "2002-10-10";
//   document.getElementById("phone-mail-regis").value = "0395932776";
// }
function get_data(res) {
  //Loại sản phẩm
  data.largeClassify = res.largeClassify;
  //Màu
  data.color = res.color;
  //Kích cỡ
  data.size = res.size;
  //Sản phẩm
  data.product = res.product;
  //Sản phẩm trong kho
  data.product_in_stock = res.product_in_stock;
  //Khuyến mãi
  data.promote = res.promotion;
  //Ảnh sản phẩm
  data.image_product = res.image_product;
  //Danh sách sản phẩm
  data.product_list = res.product_list;
}
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var response = JSON.parse(this.responseText); // lưu phản hồi vào biến cục bộ
    // sử dụng biến response ngay tại đây
    get_data(response);
    create_Homepage(response);
    // createHomepage();
  }
};
xhttp.open("GET", "server/homepage.php", true);
xhttp.send();
console.log(data);
// data = JSON.parse(localStorage.getItem("data"));
function create_Homepage(data_res) {
  //Theo loại
  data_res.largeClassify.forEach((element) => {
    var str = "";
    //Sản phẩm trong loại
    data_res.product.forEach((element_product) => {
      if (element_product.id.indexOf(element.id) != -1) {
        let link_image = "";
        let price_product = "";
        //Link image
        for (let i = 0; i < data.image_product.length; i++) {
          if (data.image_product[i].id_product == element_product.id) {
            link_image = data.image_product[i].link_image;
          }
        }
        //Giá sản phẩm
        for (let i = 0; i < data.product_list.length; i++) {
          if (data.image_product[i].id_product == element_product.id) {
            price_product = calculated(data.product_list[i].price) + " VND";
          }
        }
        str +=
          `
      <li class="main_list_product_product" id="` +
          element_product.id +
          `">
        <img class="main_list_product_product_image"
          style=""
          src="` +
          link_image +
          `"alt=""
        />
       <div class="main_list_product_product_infor"> 
       <label class="product_infor_name">` +
          element_product.name +
          `</label>
         <label>` +
          price_product +
          `</label>
        </div>
      </li>
      `;
      }
    });
    // element.
    document.getElementById("main").innerHTML +=
      `<div class="main_product">
        <div class="main_name_class_product">` +
      element.name +
      `
        </div>
        <ul class="main_list_product">
        ` +
      str +
      `
        </ul>
      </div>`;
  });
  //Bắt sk click sản phẩm
  let click_product = document.getElementsByClassName(
    "main_list_product_product"
  );
  for (let i = 0; i < click_product.length; i++) {
    click_product[i].onclick = function () {
      console.log(1);
      click_Product(click_product[i].id);
    };
  }
}
function click_Product(id) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response.data);
        if (response.success) {
          //-data -status
          //data: -image_product:
          //        +id_product
          //        +link_image
          //        +nname_image
          //      -product:
          //        +description
          //        +id
          //        +idstatus
          //        +madein
          //        +name
          document.getElementById("show_product").style.display = "flex";
          //
          document.getElementById("show_product").innerHTML =
            `<div class=sp_popup>
              <div class="popup_left">
                <img id="img_show"style="
                  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                " src="` +
            response.data.image_product[0].link_image +
            `"/>
                <div style="height:120px;
                  display: block; overflow: hidden;box-sizing: border-box;">
                  <ul id="review_image">
                  </ul>
                </div>
              </div>
              <div class="poup_right">
                <label class="popup_name_product">` +
            response.data.product[0].name +
            `</label>
                <div style="border: 1px solid gray;
                  border-radius: 10px;
                  ">
                  <label style="padding: 10px;display: block;">
                    ID sản phẩm: \t ` +
            response.data.product[0].id +
            `
                  </label>
                  <label style="padding: 10px;display: block;">
                    Tên sản phẩm: \t ` +
            response.data.product[0].name +
            `
                  </label>
                  <label style="padding: 10px;display: block;">
                    Xuất xứ: \t ` +
            response.data.madein_product[0].name +
            `
                  </label>
                </div>
                <label style="padding: 10px;display: block;">
                  Mô tả:
                </label>       
                <div style="padding: 10px;display: block;">
                  ` +
            response.data.product[0].description +
            `
                </div>   
                 <div>
                  size
                </div>
              </div>
            </div>`;
          //
          //
          response.data.image_product.forEach((element) => {
            document.getElementById("review_image").innerHTML +=
              `
            <li class="list_image_review">
              <img src="` +
              element.link_image +
              `"/>
            </li>
            `;
          });
          //
          let li_img = document.getElementsByClassName("list_image_review");
          for (let i = 0; i < li_img.length; i++) {
            li_img[i].onmouseenter = function () {
              document.getElementById("img_show").src =
                li_img[i].getElementsByTagName("img")[0].src;
            };
          }
        } else {
          // Thông báo thất bại
          alert("Không tìm thấy sản phẩm này!");
        }
      } else {
        // Thông báo lỗi nếu có
        alert("Lỗi khi kết nối đến server!");
      }
    }
  };
  xhr.open("POST", "./Server/get_product.php");
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("id_product=" + id);
}
