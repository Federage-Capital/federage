// components/Users.js
import axios from "axios";
import useSWR from "swr";
import Link from "next/link"
import ToggleLayout from "components/ToggleLayout";
import { Iconmail2 } from "components/iconmail";

export default function Users() {
  const address = `https://aout.septembre.io/api/menu_items/menu-federage`;
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);

  if (error) <p>Loading failed...</p>;
  if (!data) <h1>Loading...</h1>;

  return (
    <div>
      <div className="container menuhamburger">
      <ul>  {data &&
          data.map((item) => (
            <li key={item.key} className="jsx-751067329">
              <Link href={item.relative}passHref>
                <a>{item.title}</a>
              </Link>
              <hr className="my-1 menu" />

              </li>

          ))}
          <li className="jsx-751067329 contact"> <a href="mailto:bonjour@federage.com">Contact</a>
          <hr className="my-1 menu" />

</li>

    </ul>
    <div className="lune2" >  <ToggleLayout />

    <li className="liste-footer bis bold">  Federage, groupement d’intérêt économique basé à Paris 🇫🇷</li>

    </div>


     </div>
    </div>
  );
}
