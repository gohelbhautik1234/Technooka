export default function University() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        cardData:[
            {name:'Total Applicants'    ,total: 1250},
            {name:'Verified Applicants' ,total: 1030},
            {name:'Rejected Applicants' ,total: 120},
        ],
        perProgram: [
            { program: "BCA", applicants: 300 },
            { program: "MCA", applicants: 450 },
            { program: "MBA", applicants: 500 },
        ],
        trends: [
            { date: "01-06-2025", count: 50 },
            { date: "02-06-2025", count: 75 },
            { date: "03-06-2025", count: 90 },
        ],
    });
    }, 500);
  });
}
