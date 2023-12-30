import { Card, Typography } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loading from "../../Components/Loading";
import { useGetOrderByUserQuery } from "../../features/orderApi";
import UpdateForm from "./UpdateForm";

const UserProfile = () => {
  const TABLE_HEAD = ["Order ID", "Total", "Price", "Date"];

  const { user } = useSelector((store) => store.user);
  const nav = useNavigate();
  const { isLoading, isError, data } = useGetOrderByUserQuery(user.token);

  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="md:grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-4">
      <div className="md:col-span-1">
        <UpdateForm />
      </div>

      <div className="md:col-span-2">
        <Card className="w-full overflow-x-auto shadow-2xl">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.map(({ _id, totalPrice, createdAt }, index) => {
                  const isLast = index === data.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {_id}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {totalPrice}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {createdAt}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <button onClick={() => nav(`/user/order/${_id}`)}>
                          {" "}
                          <Typography
                            as="a"
                            variant="small"
                            color="blue"
                            className="font-medium"
                          >
                            Detail..
                          </Typography>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
