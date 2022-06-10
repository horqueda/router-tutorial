import {
  NavLink,
  Outlet,
  useSearchParams,
} from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();

  /*export default function Invoice() {
    let navigate = useNavigate();
    let location = useLocation();
    let params = useParams();
    let invoice = getInvoice(parseInt(params.invoiceId, 10));*/

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          value={searchParams.get("filter") || ""}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices
          .filter((invoice) => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <NavLink
              style={({ isActive }) => ({
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              })}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
              {invoice.name}
            </NavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}
/*
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { getInvoice, deleteInvoice } from "../data";

return (
  <main style={{ padding: "1rem" }}>
    <h2>Total Due: {invoice.amount}</h2>
    <p>
      {invoice.name}: {invoice.number}
    </p>
    <p>Due Date: {invoice.due}</p>
    <p>
      <button
        onClick={() => {
          deleteInvoice(invoice.number);
          navigate("/invoices" + location.search);
        }}
      >
        Delete
      </button>
    </p>
  </main>
);
}
*/