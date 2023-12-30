import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading";
import { products } from "../../dummy/data";
import { baseUrl } from "../../features/Constant";
import {
  useDeleteProductsMutation,
  useGetAllProductsQuery,
} from "../../features/ProductApi";

const TABLE_HEAD = ["Products", "Price", "Created At", "Edit", "Delete"];

const ProductList = () => {
  const [open, setOpen] = useState({});
  const { user } = useSelector((store) => store.user);
  const nav = useNavigate();
  const { data, isLoading, error } = useGetAllProductsQuery();
  const [deleteProducts, { isLoading: delete_loading }] =
    useDeleteProductsMutation();

  const handleDelete = async (id) => {
    try {
      const remove = await deleteProducts({
        id: id,
        token: user.token,
      }).unwrap();
      toast.success("successfully deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };
  if (isLoading) {
    return<Loading/>;
  }

  const toggleOpen=(productId)=>{
    setOpen((prevState)=>({
      ...prevState,
      [productId]:!prevState[productId],
    }))
  }
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-5 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Product List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all products
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              onClick={() => nav("/product/add")}
              className="flex items-center gap-3"
              color="blue"
              size="sm"
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Product
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
              data.map(
                (
                  {
                    product_image,
                    product_name,
                    createdAt,
                    _id,
                    product_price,
                  },
                  index
                ) => {
                  const isLast = index === products.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={`${baseUrl}${product_image}`}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {product_name}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            Rs.{product_price}
                          </Typography>
                        </div>
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
                        <Tooltip content="Edit Product">
                          <IconButton
                            onClick={() => nav(`/product/${_id}`)}
                            variant="text"
                            color="blue-gray"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>

                      <td className={classes}>
                        <Tooltip content="Remove Product">
                          <IconButton
                            onClick={()=>toggleOpen(_id)}
                            variant="text"
                            color="red"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>

                     <Dialog open={open[_id]} handler={()=>toggleOpen(_id)}>
                          <DialogHeader>Delete this product</DialogHeader>
                          <DialogBody divider>
                            Are you sure you want to delete this product?
                          </DialogBody>
                          <DialogFooter>
                            <Button
                              variant="text"
                              color="red"
                              onClick={()=>toggleOpen(_id)}
                              className="mr-1"
                            >
                              <span>Cancel</span>
                            </Button>
                            <Button
                              variant="gradient"
                              color="green"
                              onClick={() => {
                                handleDelete(_id);
                                toggleOpen(_id);
                              }}
                            >
                              <span>Confirm</span>
                            </Button>
                          </DialogFooter>
                        </Dialog>
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default ProductList;
