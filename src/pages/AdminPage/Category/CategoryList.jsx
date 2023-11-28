// CategoryList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import Table from "../../../components/Table/Table";
import "./CategoryList.css";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/category/findAll")
            .then((response) => response.json())
            .then((data) => {
                setCategories(data?.data);
            });
    }, []);

    const columns = [
        {
            title: "Tên",
            dataIndex: "ten",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
        },
        {
            title: "Chi tiết",
            render: (category) => (
                <Link to={`${category?._id}`}><EditOutlined /></Link>
            ),
        },
    ];

    return (
        <div className="container">
            <h2>Danh sách danh mục</h2>
            <div className={"d-flex"}>
                <Link to="new">
                    <button>
                        <PlusOutlined /> Thêm mới
                    </button>
                </Link>
            </div>
            <Table columns={columns} dataSource={categories} />
        </div>
    );
};

export default CategoryList;
