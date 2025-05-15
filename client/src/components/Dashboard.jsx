import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";

const PAGE_SIZE = 25;

const Dashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ count: 0, items: [] });

  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("1");
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const fetchData = useCallback(() => {
    const abortController = new AbortController();

    setLoading(true);

    axios
      .get("/api/jewellery", {
        signal: abortController.signal,
        params: new URLSearchParams({
          sortBy,
          sortOrder,
          search,
          pageNumber,
          pageSize: PAGE_SIZE,
        }),
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Couldn't fetch the data", error);

        if (!axios.isCancel(error)) {
          setLoading(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [sortBy, sortOrder, debouncedSearch, pageNumber]);

  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handle);
    };
  }, [search]);

  useEffect(() => {
    return fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this data!");

    try {
      if (confirmDelete) {
        setLoading(true);

        await axios.delete(`/api/jewellery/${id}`);

        alert("Successfully deleted the data!");
      } else {
        alert("Failed to delete the data!");
        return;
      }
    } catch (error) {
      console.error("Couldn't delete the data!");
    } finally {
      setLoading(false);
    }

    if (pageNumber === 1) {
      fetchData();
    } else {
      setPageNumber(1);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex p-3 px-5 mb-5">
        <div className="flex gap-5 flex-1 ">
          <select
            value={sortBy}
            className="border bg-white rounded-md shadow-md p-1"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="description">Description</option>
            <option value="category">Category</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
            <option value="manufacturingDate">Manufacturing Date</option>
          </select>
          <select
            className="border bg-white rounded-md shadow-md p-1"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="1">ASC</option>
            <option value="-1">DESC</option>
          </select>
          <input
            className="w-full p-1 border bg-white rounded-md shadow-md mr-5"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-end font-medium bg-green-600 p-2 text-white border rounded-md">
          <Link to="/jewellery">ADD</Link>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center font-semibold text-2xl items-center flex-1">
          Loading...
        </div>
      ) : data?.items?.length > 0 ? (
        <div className="overflow-auto px-5 flex-1" style={{ flex: "1 1 1px" }}>
          <div
            className="grid gap-10"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            }}
          >
            {data?.items?.map((product) => (
              <div key={product._id} className=" bg-white shadow-md rounded-md">
                <img
                  className="object-contain aspect-square w-full bg-black border rounded-t-md"
                  alt={product.name}
                  src={product.jewelleryImage?.dataUrl}
                />
                <div className="p-2 text-base">
                  <div className="font-semibold text-lg text-green-700">
                    {product.name}
                  </div>
                  <div className="font-medium text-yellow-800">
                    {product.category}
                  </div>
                  <div className="">{product.description}</div>
                  <div className="flex justify-between">
                    <div className="font-medium">Stock: {product.stock}</div>
                    <div className="text-orange-600 font-medium">
                      Price: ₹{product.price}
                    </div>
                  </div>
                  <div className="">
                    Mfg. Date:{" "}
                    {new Date(product.manufacturingDate).toLocaleDateString()}
                  </div>
                  <div className="flex justify-between pt-2 pb-2 text-lg font-medium">
                    <button
                      className="hover:text-disableButton outline-none"
                      onClick={() => {
                        navigate("/jewellery", {
                          state: { existingData: product },
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="hover:text-red-500 outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center font-semibold text-2xl items-center flex-1">
          Data not found
        </div>
      )}

      <div className="flex items-center justify-center p-3">
        <ReactPaginate
          forcePage={pageNumber - 1}
          onPageChange={({ selected }) => {
            setPageNumber(selected + 1);
          }}
          pageRangeDisplayed={5}
          pageCount={data.count ? Math.ceil(data.count / PAGE_SIZE) : 0}
          renderOnZeroPageCount={false}
          className="flex gap-2"
          activeClassName="bg-emerald-800 text-white px-2 rounded"
        />
      </div>
    </div>
  );
};

export default Dashboard;
