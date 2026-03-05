const connectDB = require("./data");
const Item = require("../models/item");

const seedData = [
  {
    title: "Black Wallet",
    description: "Lost black leather wallet near canteen",
    category: "Wallet",
    status: "lost",
    img: ["wallet.webp"],
    location: "College Canteen",
    date: new Date("2026-02-10"),
    time: "2:30 PM",
    personalInfo: {
      name: "Rahul Patil",
      number: "9876543210",
      collegeId: "CSE102",
      email: "rahul@gmail.com",
      department: "CSE",
      role: "Student"
    }
  },
  {
    title: "Smart Watch",
    description: "Found smartwatch near parking",
    category: "Watch",
    status: "found",
    img: ["watch.webp"],
    location: "Parking Area",
    date: new Date("2026-02-12"),
    time: "11:00 AM",
    personalInfo: {
      name: "Amit Sharma",
      number: "9123456780",
      collegeId: "ME203",
      email: "amit@gmail.com",
      department: "Mechanical",
      role: "Student"
    }
  },
  {
    title: "College ID Card",
    description: "Lost ID card near library",
    category: "ID Card",
    status: "lost",
    img: ["idcard.png"],
    location: "Library",
    date: new Date("2026-02-11"),
    time: "1:15 PM",
    personalInfo: {
      name: "Sneha Joshi",
      number: "9988776655",
      collegeId: "IT305",
      email: "sneha@gmail.com",
      department: "IT",
      role: "Student"
    }
  },
  {
    title: "Blue Backpack",
    description: "Found bag with books inside",
    category: "Bag",
    status: "found",
    img: ["bag.jpg"],
    location: "Bus Stop",
    date: new Date("2026-02-09"),
    time: "5:45 PM",
    personalInfo: {
      name: "Rohit Deshmukh",
      number: "9011223344",
      collegeId: "CE110",
      email: "rohit@gmail.com",
      department: "Civil",
      role: "Student"
    }
  },
  {
    title: "Mobile Phone",
    description: "Lost Redmi phone near ground",
    category: "Mobile",
    status: "lost",
    img: ["phone.jpg"],
    location: "College Ground",
    date: new Date("2026-02-08"),
    time: "4:20 PM",
    personalInfo: {
      name: "Kunal More",
      number: "9090909090",
      collegeId: "ENT404",
      email: "kunal@gmail.com",
      department: "ENTC",
      role: "Student"
    }
  },
  {
    title: "Keys",
    description: "Found bike keys near gate",
    category: "Keys",
    status: "found",
    img: ["keys.jpg"],
    location: "Main Gate",
    date: new Date("2026-02-13"),
    time: "9:10 AM",
    personalInfo: {
      name: "Admin Office",
      number: "9999999999",
      collegeId: "ADMIN01",
      email: "admin@college.com",
      department: "Office",
      role: "Staff"
    }
  }
];

async function seedDB() {
  await connectDB();
  await Item.deleteMany(); // clean old data
  await Item.insertMany(seedData);
  console.log("✅ 6 Random Cards Data Inserted");
  process.exit();
}

seedDB();