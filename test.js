const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb://khushibahl06_db_user:House12345@ac-vcazrbw-shard-00-00.pndp33o.mongodb.net:27017,ac-vcazrbw-shard-00-01.pndp33o.mongodb.net:27017,ac-vcazrbw-shard-00-02.pndp33o.mongodb.net:27017/HouseRent?authSource=admin&replicaSet=atlas-w4iim2-shard-0&ssl=true&retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

run();







import { Link, Outlet } from "react-router-dom";

export default function AdminHome() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "250px",
        background: "#190a56",
        color: "#fff",
        padding: "20px"
      }}>
        <h3>Admin Panel</h3>

        <Link to="/admin" style={style}>Dashboard</Link>
        <Link to="/admin/users" style={style}>Users</Link>
        <Link to="/admin/properties" style={style}>Properties</Link>
        <Link to="/admin/bookings" style={style}>Bookings</Link>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
}

 const style = {
  display: "block",
  color: "white",
  margin: "15px 0",
  textDecoration: "none"
};






