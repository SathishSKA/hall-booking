import express from "express";
const app = express();

app.use(express.json());

const rooms = [
  {
    name: "Deluxe",
    seats: 70,
    amenities: "A/C, TV, WiFi Access (Free), Daily Newspaper",
    price: 4000,
    room_id: "47856",
    bookingDetails: [
      {
        customer_name: "Vijay",
        date: "04/06/2022",
        start: "08:00 am",
        end: "11:00 pm",
        status: "Confirmed",
      },
    ],
  },
  {
    name: "Super-Deluxe",
    seats: 120,
    amenities: "A/C, TV, WiFi Access (Free),  Daily Newspaper, Private  Wardrobe, Sit Out Lawn, Coffee/Tea maker",
    price: 6000,
    room_id: "47745",
    bookingDetails: [
      {
        customer_name: "Sanjay",
        date: "17/06/2022",
        start: "07:00 am",
        end: "10:00 pm",
        status: "Not paid",
      },
    ],
  },
  {
    name: "Premium",
    seats: 170,
    amenities: "A/C, TV, WiFi Access (Free),  Daily Newspaper, Private  Wardrobe, Sit Out Lawn, Coffee/Tea maker, Refrigerator, Electric Heaters, Sofa, Sitting Area",
    price: 8000,
    room_id: "47458",
    bookingDetails: [
      {
        customer_name: "Vetrivel",
        date: "28/06/2022",
        start: "09:00 am",
        end: "10:00 pm",
        status: "Confirmed",
      },
    ],
  },
];

app.get("/", (req, res) => {
  res.status(200).send("Server is running.... ");
});

app.post("/create-room", (req, res) => {
  rooms.push({
    name: req.body.name,
    seats: req.body.seats,
    amenities: req.body.amenities,
    price: req.body.price,
    room_id: `${req.body.seats}${req.body.price}${rooms.length + 1}`,
    bookingDetails: [{}],
  });
  res.send(rooms);
});

app.post("/book-room", (req, res) => {
  for (let i = 0; i < rooms.length; i++) {
    console.log("a");
    if (!(rooms[i].room_id === req.body.room_id)) {
      return res.status(400).send({ error: "Invalid" });
    } else {
      let booking = {
        customer_name: req.body.name,
        date: new Date(req.body.date),
        start: req.body.start,
        end: req.body.end,
        status: "confirmed",
      };
      let result = undefined;
      rooms[i].bookingDetails.forEach((book) => {
        if (book.date.getTime() == booking.date.getTime() && book.start === booking.start) {
          result = 0;
          console.log("in booking");
        } else {
          result = 1;
          rooms[i].bookingDetails.push(booking);
        }
      });
      if (result) return res.status(200).send("Booking confirmed");
      else return res.status(400).send({ error: "Please select different time slot" });
    }
  }
});

app.get("/list-customer", (req, res) => {
  let customer_list = [];

  rooms.forEach((room) => {
    let customer_det = { room_name: room.name };

    room.bookingDetails.forEach((customer) => {
      customer_det.customer_name = customer.customer_name;
      customer_det.date = customer.date;
      customer_det.start = customer.start;
      customer_det.end = customer.end;

      customer_list.push(customer_det);
    });
  });

  res.send(customer_list);
});

app.get("/booked-rooms", (req, res) => {
  console.log("list rooms");
  res.status(200).send(rooms);
});

app.get("/", (req, res) => {
  console.log("server is running....");
});

app.listen(process.env.PORT || 5000, function () {
  console.log("server started at 5000");
});
