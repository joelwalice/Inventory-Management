"use client"
import React, { useEffect, useState } from "react";
import Navbar from "../../../../components/Navbar";
import { BASE_URL } from "../../../../../utils/constants";
import { useParams } from "next/navigation";
import axios from "axios";

const EditProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [sku, setSku] = useState("");
    const [incoming, setIncoming] = useState("");
    const [stock, setStock] = useState("");
    const [product, setProduct] = useState(false);
    const { id } = useParams();
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");


    useEffect(() => {
        if (!id) {
            setProduct(true);
            return product;
        } else {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/api/inventory/${id}`);
                    if (response.status === 201) {
                        const data = response.data;
                        setName(data.data.name);
                        setCategory(data.data.category);
                        setPrice(data.data.price);
                        setSku(data.data.sku);
                        setImage(data.data.image);
                        setIncoming(data.data.incoming);
                        setStock(data.data.stock);
                    } else {
                        console.log("Error fetching data:", response.status);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
    
            fetchData();
        }
    }, []);    

    const createP = async (e) => {
        e.preventDefault(e);
        if (name === "" || price === "") {
            alert("Please fill all the fields");
            return;
        }
        
        const response = await axios.put(`${BASE_URL}/api/inventory/${id}`, {
                image,
                name,
                category,
                sku,
                incoming,
                stock,
                price,
            })
        if (response.status === 201) {
            window.location.href = "/home/inventory";
        }
    };

    return (
        <div>
            <Navbar />
            <div className='pl-[200px] p-4'>
                <form className="flex flex-col p-4 gap-4 text-gray-500">
                    <h1 className="text-4xl font-semibold text-center text-black">
                        Edit Product
                    </h1>
                    <label className="text-xl font-semibold text-black">Product Name</label>
                    <input
                        type="text"
                        placeholder="Product Name"
                        required
                        value={name}
                        onChange={(ev) => setName(ev.target.value)}
                        className=" flex flex-col justify-center items-center p-2 border border-black rounded-md"
                    />
                    <label className="text-xl font-semibold text-black">Product Category</label>
                    <div className="rounded-lg flex items-center gap-4">
                        <label className="">
                            <input
                                type="radio"
                                name="category"
                                style={{ accentColor: "green" }}
                                value="Finished Goods"
                                checked={category === "Finished Goods"}
                                onChange={(ev) => setCategory(ev.target.value)}
                            />
                            {" "}Finished Goods
                        </label>
                        <label className="">
                            <input
                                type="radio"
                                style={{ accentColor: "green" }}
                                name="category"
                                value="Raw Material"
                                checked={category === "Raw Material"}
                                onChange={(ev) => setCategory(ev.target.value)}
                            />
                            {" "}Raw Material
                        </label>
                        <label className="">
                            <input
                                type="radio"
                                name="category"
                                style={{ accentColor: "green" }}
                                value="Groceries"
                                checked={category === "Groceries"}
                                onChange={(ev) => setCategory(ev.target.value)}
                            />
                            {" "}Groceries
                        </label>
                        <label className="">
                            <input
                                type="radio"
                                style={{ accentColor: "green" }}
                                name="category"
                                value="Clothings"
                                checked={category === "Clothings"}
                                onChange={(ev) => setCategory(ev.target.value)}
                            />
                            {" "}Clothings
                        </label>
                    </div>
                    <label className="text-xl font-semibold text-black">Product SKU</label>
                    <input
                        type="text"
                        placeholder="Product SKU"
                        required
                        value={sku}
                        onChange={(ev) => setSku(ev.target.value)}
                        className=" flex flex-col justify-center items-center p-2 border border-black rounded-md"
                    />
                    <label className="text-xl font-semibold text-black">Product Incoming</label>
                    <input
                        type="text"
                        placeholder="Product Incoming"
                        required
                        value={incoming}
                        onChange={(ev) => setIncoming(ev.target.value)}
                        className=" flex flex-col justify-center items-center p-2 border border-black rounded-md"
                    />
                    <label className="text-xl font-semibold text-black">Product Stock</label>
                    <input
                        type="text"
                        placeholder="Stock"
                        required
                        value={stock}
                        onChange={(ev) => setStock(ev.target.value)}
                        className=" flex flex-col justify-center items-center p-4 border border-black rounded-md"
                    />
                    <label className="text-xl font-semibold text-black">Product Image</label>
                    <div className="flex flex-col justify-center ">
                        <div className="rounded-xl">
                            {image === "" || image == null ? (
                                ""
                            ) : (
                                <img
                                    src={image}
                                    width={200}
                                    height={200}
                                    className="rounded-xl mb-4"
                                />
                            )}
                        </div>
                        <input accept="image/*" type="file" onChange={(e) => setImage(e.target.files[0])}/>
                    </div>
                    <label className="text-xl font-semibold text-black">Product Price</label>
                    <input
                        type="text"
                        placeholder="Price"
                        required
                        value={price}
                        onChange={(ev) => setPrice(ev.target.value)}
                        className=" flex flex-col justify-center items-center p-4 border border-black rounded-md"
                    />
                    <div>
                        <button
                            onClick={createP}
                            className="rounded-xl p-4 bg-green-700 border-green-700 text-white font-semibold"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
