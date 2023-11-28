// import { Button, Form, Select, Space } from 'antd'
// import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
// import React, { useRef } from 'react'
// import { WrapperHeader, WrapperUploadFile } from './style'
// import TableComponent from '../TableComponent/TableComponent'
// import { useState } from 'react'
// import InputComponent from '../InputComponent/InputComponent'
// import { getBase64, renderOptions } from '../../utils'
// import * as ProductService from '../../services/ProductService'
// import { useMutationHooks } from '../../hooks/useMutationHook'
// import Loading from '../../components/LoadingComponent/Loading'
// import { useEffect } from 'react'
// import * as message from '../../components/Message/Message'
// import { useQuery } from '@tanstack/react-query'
// import DrawerComponent from '../DrawerComponent/DrawerComponent'
// import { useSelector } from 'react-redux'
// import ModalComponent from '../ModalComponent/ModalComponent'

// const AdminProduct = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [rowSelected, setRowSelected] = useState('')
//   const [isOpenDrawer, setIsOpenDrawer] = useState(false)
//   const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
//   const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
//   const user = useSelector((state) => state?.user)
//   const searchInput = useRef(null);
//   const inittial = () => ({
//     tenSanPham: '',
//     donGia: '',
//     description: '',
//     rating: '',
//     hinhAnh: '',
//     type: '',
//     mount: '',
//     size: '',
//     newType: '',
//     discount: '',
//   })
//   const [stateProduct, setStateProduct] = useState(inittial())
//   const [stateProductDetails, setStateProductDetails] = useState(inittial())

//   const [form] = Form.useForm();

//   const mutation = useMutationHooks(
//     (data) => {
//       const { 
//         tenSanPham,
//         donGia,
//         description,
//         rating,
//         hinhAnh,
//         type,
//         mount,
//         size,
//         discount } = data
//       const res = ProductService.createProduct({
//         tenSanPham,
//         donGia,
//         description,
//         rating,
//         hinhAnh,
//         type,
//         mount,
//         size,
//         discount
//       })
//       return res
//     }
//   )
//   const mutationUpdate = useMutationHooks(
//     (data) => {
//       const { id,
//         token,
//         ...rests } = data
//       const res = ProductService.updateProduct(
//         id,
//         token,
//         { ...rests })
//       return res
//     },
//   )

//   const mutationDeleted = useMutationHooks(
//     (data) => {
//       const { id,
//         token,
//       } = data
//       const res = ProductService.deleteProduct(
//         id,
//         token)
//       return res
//     },
//   )

//   const mutationDeletedMany = useMutationHooks(
//     (data) => {
//       const { token, ...ids
//       } = data
//       const res = ProductService.deleteManyProduct(
//         ids,
//         token)
//       return res
//     },
//   )

//   const getAllProducts = async () => {
//     const res = await ProductService.getAllProduct()
//     return res
//   }

//   const fetchGetDetailsProduct = async (rowSelected) => {
//     const res = await ProductService.getDetailsProduct(rowSelected)
//     if (res?.data) {
//       setStateProductDetails({
//         tenSanPham: res?.data?.tenSanPham,
//         donGia: res?.data?.donGia,
//         description: res?.data?.description,
//         rating: res?.data?.rating,
//         hinhAnh: res?.data?.hinhAnh,
//         type: res?.data?.type,
//         mount: res?.data?.mount,
//         size: res?.data?.size,
//         discount: res?.data?.discount
//       })
//     }
//     setIsLoadingUpdate(false)
//   }

//   useEffect(() => {
//     if(!isModalOpen) {
//       form.setFieldsValue(stateProductDetails)
//     }else {
//       form.setFieldsValue(inittial())
//     }
//   }, [form, stateProductDetails, isModalOpen])

//   useEffect(() => {
//     if (rowSelected && isOpenDrawer) {
//       setIsLoadingUpdate(true)
//       fetchGetDetailsProduct(rowSelected)
//     }
//   }, [rowSelected, isOpenDrawer])

//   const handleDetailsProduct = () => {
//     setIsOpenDrawer(true)
//   }

//   const handleDelteManyProducts = (ids) => {
//     mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
//       onSettled: () => {
//         queryProduct.refetch()
//       }
//     })
//   }

//   const fetchAllTypeProduct = async () => {
//     const res = await ProductService.getAllTypeProduct()
//     return res
//   }

//   const { data, isLoading, isSuccess, isError } = mutation
//   const { data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
//   const { data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDelected, isError: isErrorDeleted } = mutationDeleted
//   const { data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDelectedMany, isError: isErrorDeletedMany } = mutationDeletedMany


//   const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
//   const typeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct })
//   const { isLoading: isLoadingProducts, data: products } = queryProduct
//   const renderAction = () => {
//     return (
//       <div>
//         <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
//         <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
//       </div>
//     )
//   }


//   const handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     // setSearchText(selectedKeys[0]);
//     // setSearchedColumn(dataIndex);
//   };
//   const handleReset = (clearFilters) => {
//     clearFilters();
//     // setSearchText('');
//   };

//   const getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//       <div
//         style={{
//           padding: 8,
//         }}
//         onKeyDown={(e) => e.stopPropagation()}
//       >
//         <InputComponent
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{
//             marginBottom: 8,
//             display: 'block',
//           }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Reset
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined
//         style={{
//           color: filtered ? '#1890ff' : undefined,
//         }}
//       />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//     // render: (text) =>
//     //   searchedColumn === dataIndex ? (
//     //     // <Highlighter
//     //     //   highlightStyle={{
//     //     //     backgroundColor: '#ffc069',
//     //     //     padding: 0,
//     //     //   }}
//     //     //   searchWords={[searchText]}
//     //     //   autoEscape
//     //     //   textToHighlight={text ? text.toString() : ''}
//     //     // />
//     //   ) : (
//     //     text
//     //   ),
//   });


//   const columns = [
//     {
//       title: 'Name',
//       dataIndex: 'tenSanPham',
//       sorter: (a, b) => a.tenSanPham.length - b.tenSanPham.length,
//       ...getColumnSearchProps('tenSanPham')
//     },
//     {
//       title: 'Price',
//       dataIndex: 'donGia',
//       sorter: (a, b) => a.donGia - b.donGia,
//       filters: [
//         {
//           text: '>= 50',
//           value: '>=',
//         },
//         {
//           text: '<= 50',
//           value: '<=',
//         }
//       ],
//       onFilter: (value, record) => {
//         if (value === '>=') {
//           return record.donGia >= 50
//         }
//         return record.donGia <= 50
//       },
//     },
//     {
//       title: 'Rating',
//       dataIndex: 'rating',
//       sorter: (a, b) => a.rating - b.rating,
//       filters: [
//         {
//           text: '>= 3',
//           value: '>=',
//         },
//         {
//           text: '<= 3',
//           value: '<=',
//         }
//       ],
//       onFilter: (value, record) => {
//         if (value === '>=') {
//           return Number(record.rating) >= 3
//         }
//         return Number(record.rating) <= 3
//       },
//     },
//     {
//       title: 'Type',
//       dataIndex: 'type',
//     },
//     {
//       title: 'Action',
//       dataIndex: 'action',
//       render: renderAction
//     },
//   ];
//   const dataTable = products?.data?.length && products?.data?.map((product) => {
//     return { ...product, key: product._id }
//   })

//   useEffect(() => {
//     if (isSuccess && data?.status === 'OK') {
//       message.success()
//       handleCancel()
//     } else if (isError) {
//       message.error()
//     }
//   }, [isSuccess])

//   useEffect(() => {
//     if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
//       message.success()
//     } else if (isErrorDeletedMany) {
//       message.error()
//     }
//   }, [isSuccessDelectedMany])

//   useEffect(() => {
//     if (isSuccessDelected && dataDeleted?.status === 'OK') {
//       message.success()
//       handleCancelDelete()
//     } else if (isErrorDeleted) {
//       message.error()
//     }
//   }, [isSuccessDelected])

//   const handleCloseDrawer = () => {
//     setIsOpenDrawer(false);
//     setStateProductDetails({
//       tenSanPham: '',
//       donGia: '',
//       description: '',
//       rating: '',
//       hinhAnh: '',
//       type: '',
//       mount: '',
//       size: ''

//     })
//     form.resetFields()
//   };

//   useEffect(() => {
//     if (isSuccessUpdated && dataUpdated?.status === 'OK') {
//       message.success()
//       handleCloseDrawer()
//     } else if (isErrorUpdated) {
//       message.error()
//     }
//   }, [isSuccessUpdated])

//   const handleCancelDelete = () => {
//     setIsModalOpenDelete(false)
//   }


//   const handleDeleteProduct = () => {
//     mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
//       onSettled: () => {
//         queryProduct.refetch()
//       }
//     })
//   }

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setStateProduct({
//       tenSanPham: '',
//       donGia: '',
//       description: '',
//       rating: '',
//       hinhAnh: '',
//       type: '',
//       mount: '',
//       size: '',
//       discount: '',
//     })
//     form.resetFields()
//   };

//   const onFinish = () => {
//     const params = {
//       tenSanPham: stateProduct.tenSanPham,
//       donGia: stateProduct.donGia,
//       description: stateProduct.description,
//       rating: stateProduct.rating,
//       hinhAnh: stateProduct.hinhAnh,
//       type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
//       mount: stateProduct.mount,
//       size: stateProduct.size,
//       discount: stateProduct.discount
//     }
//     mutation.mutate(params, {
//       onSettled: () => {
//         queryProduct.refetch()
//       }
//     })
//   }

//   const handleOnchange = (e) => {
//     setStateProduct({
//       ...stateProduct,
//       [e.target.tenSanPham]: e.target.value
//     })
//   }

//   const handleOnchangeDetails = (e) => {
//     setStateProductDetails({
//       ...stateProductDetails,
//       [e.target.tenSanPham]: e.target.value
//     })
//   }

//   const handleOnchangeAvatar = async ({ fileList }) => {
//     const file = fileList[0]
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }
//     setStateProduct({
//       ...stateProduct,
//       hinhAnh: file.preview
//     })
//   }

//   const handleOnchangeAvatarDetails = async ({ fileList }) => {
//     const file = fileList[0]
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }
//     setStateProductDetails({
//       ...stateProductDetails,
//       hinhAnh: file.preview
//     })
//   }
//   const onUpdateProduct = () => {
//     mutationUpdate.mutate({ id: rowSelected, token: user?.access_token, ...stateProductDetails }, {
//       onSettled: () => {
//         queryProduct.refetch()
//       }
//     })
//   }

//   const handleChangeSelect = (value) => {
//       setStateProduct({
//         ...stateProduct,
//         type: value
//       })
//   }

//   return (
//     <div>
//       <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
//       <div style={{ marginTop: '10px' }}>
//         <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '60px' }} /></Button>
//       </div>
//       <div style={{ marginTop: '20px' }}>
//         <TableComponent handleDelteMany={handleDelteManyProducts} columns={columns} data={dataTable} onRow={(record, rowIndex) => {
//           return {
//             onClick: event => {
//               setRowSelected(record._id)
//             }
//           };
//         }} />
//       </div>
//       <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
//         <Loading isLoading={isLoading}>

//           <Form
//             name="basic"
//             labelCol={{ span: 6 }}
//             wrapperCol={{ span: 18 }}
//             onFinish={onFinish}
//             autoComplete="on"
//             form={form}
//           >
//             <Form.Item
//               label="Name"
//               name="tenSanPham"
//               rules={[{ required: true, message: 'Please input your tenSanPham!' }]}
//             >
//               <InputComponent value={stateProduct['tenSanPham']} onChange={handleOnchange} name="tenSanPham" />
//             </Form.Item>

//             <Form.Item
//               label="Type"
//               name="type"
//               rules={[{ required: true, message: 'Please input your type!' }]}
//             >
//               <Select
//                 name="type"
//                 // defaultValue="lucy"
//                 // style={{ width: 120 }}
//                 value={stateProduct.type}
//                 onChange={handleChangeSelect}
//                 options={renderOptions(typeProduct?.data?.data)}
//                 />
//             </Form.Item>
//             {stateProduct.type === 'add_type' && (
//               <Form.Item
//                 label='New type'
//                 name="newType"
//                 rules={[{ required: true, message: 'Please input your type!' }]}
//               >
//                 <InputComponent value={stateProduct.newType} onChange={handleOnchange} name="newType" />
//               </Form.Item>
//             )}
//             <Form.Item
//               label="Size"
//               name="size"
//               rules={[{ required: true, message: 'Please input your size!' }]}
//             >
//               <InputComponent value={stateProduct.size} onChange={handleOnchange} name="size" />
//             </Form.Item>
//             <Form.Item
//               label="Count inStock"
//               name="mount"
//               rules={[{ required: true, message: 'Please input your count inStock!' }]}
//             >
//               <InputComponent value={stateProduct.mount} onChange={handleOnchange} name="mount" />
//             </Form.Item>
//             <Form.Item
//               label="Price"
//               name="donGia"
//               rules={[{ required: true, message: 'Please input your count donGia!' }]}
//             >
//               <InputComponent value={stateProduct.donGia} onChange={handleOnchange} name="donGia" />
//             </Form.Item>
//             <Form.Item
//               label="Description"
//               name="description"
//               rules={[{ required: true, message: 'Please input your count description!' }]}
//             >
//               <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description" />
//             </Form.Item>
//             <Form.Item
//               label="Rating"
//               name="rating"
//               rules={[{ required: true, message: 'Please input your count rating!' }]}
//             >
//               <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating" />
//             </Form.Item>
//             {/* <Form.Item
//               label="Discount"
//               name="discount"
//               rules={[{ required: true, message: 'Please input your discount of product!' }]}
//             >
//               <InputComponent value={stateProduct.discount} onChange={handleOnchange} name="discount" />
//             </Form.Item> */}
//             {/* <Form.Item
//               label="Image"
//               name="hinhAnh"
//               rules={[{ required: true, message: 'Please input your count hinhAnh!' }]}
//             >
//               <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
//                 <Button >Select File</Button>
//                 {stateProduct?.hinhAnh && (
//                   <img src={stateProduct?.hinhAnh} style={{
//                     height: '60px',
//                     width: '60px',
//                     borderRadius: '50%',
//                     objectFit: 'cover',
//                     marginLeft: '10px'
//                   }} alt="avatar" />
//                 )}
//               </WrapperUploadFile>
//             </Form.Item> */}
//             <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
//               <Button type="primary" htmlType="submit">
//                 Submit
//               </Button>
//             </Form.Item>
//           </Form>
//         </Loading>
//       </ModalComponent>
//       <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width="90%">
//         <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>

//           <Form
//             name="basic"
//             labelCol={{ span: 2 }}
//             wrapperCol={{ span: 22 }}
//             onFinish={onUpdateProduct}
//             autoComplete="on"
//             form={form}
//           >
//             <Form.Item
//               label="Name"
//               name="tenSanPham"
//               rules={[{ required: true, message: 'Please input your tenSanPham!' }]}
//             >
//               <InputComponent value={stateProductDetails['tenSanPham']} onChange={handleOnchangeDetails} name="tenSanPham" />
//             </Form.Item>

//             <Form.Item
//               label="Type"
//               name="type"
//               rules={[{ required: true, message: 'Please input your type!' }]}
//             >
//               <InputComponent value={stateProductDetails['type']} onChange={handleOnchangeDetails} name="type" />
//             </Form.Item>
//             <Form.Item
//               label="Count inStock"
//               name="mount"
//               rules={[{ required: true, message: 'Please input your count inStock!' }]}
//             >
//               <InputComponent value={stateProductDetails.mount} onChange={handleOnchangeDetails} name="mount" />
//             </Form.Item>
//             <Form.Item
//               label="Price"
//               name="donGia"
//               rules={[{ required: true, message: 'Please input your count donGia!' }]}
//             >
//               <InputComponent value={stateProductDetails.donGia} onChange={handleOnchangeDetails} name="donGia" />
//             </Form.Item>
//             <Form.Item
//               label="Description"
//               name="description"
//               rules={[{ required: true, message: 'Please input your count description!' }]}
//             >
//               <InputComponent value={stateProductDetails.description} onChange={handleOnchangeDetails} name="description" />
//             </Form.Item>
//             <Form.Item
//               label="Rating"
//               name="rating"
//               rules={[{ required: true, message: 'Please input your count rating!' }]}
//             >
//               <InputComponent value={stateProductDetails.rating} onChange={handleOnchangeDetails} name="rating" />
//             </Form.Item>
//             <Form.Item
//               label="Discount"
//               name="discount"
//               rules={[{ required: true, message: 'Please input your discount of product!' }]}
//             >
//               <InputComponent value={stateProductDetails.discount} onChange={handleOnchangeDetails} name="discount" />
//             </Form.Item>
//             <Form.Item
//               label="Image"
//               name="hinhAnh"
//               rules={[{ required: true, message: 'Please input your count hinhAnh!' }]}
//             >
//               <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
//                 <Button >Select File</Button>
//                 {stateProductDetails?.hinhAnh && (
//                   <img src={stateProductDetails?.hinhAnh} style={{
//                     height: '60px',
//                     width: '60px',
//                     borderRadius: '50%',
//                     objectFit: 'cover',
//                     marginLeft: '10px'
//                   }} alt="avatar" />
//                 )}
//               </WrapperUploadFile>
//             </Form.Item>
//             <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
//               <Button type="primary" htmlType="submit">
//                 Apply
//               </Button>
//             </Form.Item>
//           </Form>
//         </Loading>
//       </DrawerComponent>
//       <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
//         <Loading isLoading={isLoadingDeleted}>
//           <div>Bạn có chắc xóa sản phẩm này không?</div>
//         </Loading>
//       </ModalComponent>
//     </div>
//   )
// }

// export default AdminProduct

// test
import {Button, Form, Select, Space} from 'antd'
import {PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined} from '@ant-design/icons'
import React, {useRef} from 'react'
import {WrapperHeader, WrapperUploadFile} from './style'
import TableComponent from '../TableComponent/TableComponent'
import {useState} from 'react'
import InputComponent from '../InputComponent/InputComponent'
import {convertToSelected, getBase64, renderOptions, renderOptionsCategory} from '../../utils'
import * as ProductService from '../../services/ProductService'
import {useMutationHooks} from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import {useEffect} from 'react'
import * as message from '../../components/Message/Message'
import {useQuery} from '@tanstack/react-query'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import {useSelector} from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'
import {getAllTypeProduct} from "../../services/ProductService";

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const searchInput = useRef(null);
    const inittial = () => ({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        type: '',
        countInStock: '',
        size: '',
        newType: '',
        discount: '',
    })
    const [stateProduct, setStateProduct] = useState(inittial())
    const [stateProductDetails, setStateProductDetails] = useState(inittial())

    const [form] = Form.useForm();

    const mutation = useMutationHooks(
        (data) => {
            const {
                name,
                price,
                description,
                rating,
                image,
                type,
                countInStock,
                discount,
                size
            } = data
            const res = ProductService.createProduct({
                name,
                price,
                description,
                rating,
                image,
                type,
                countInStock,
                size,
                discount
            })
            return res
        }
    )
    const mutationUpdate = useMutationHooks(
        (data) => {
            const {
                id,
                token,
                ...rests
            } = data
            const res = ProductService.updateProduct(
                id,
                token,
                {...rests})
            return res
        },
    )

    const mutationDeleted = useMutationHooks(
        (data) => {
            const {
                id,
                token,
            } = data
            const res = ProductService.deleteProduct(
                id,
                token)
            return res
        },
    )

    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const {
                token, ...ids
            } = data
            const res = ProductService.deleteManyProduct(
                ids,
                token)
            return res
        },
    )

    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct()
        return res
    }

    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await ProductService.getDetailsProduct(rowSelected)
        if (res?.data) {
            setStateProductDetails({
                name: res?.data?.name,
                price: res?.data?.price,
                description: res?.data?.description,
                rating: res?.data?.rating,
                image: res?.data?.image,
                type: res?.data?.type,
                countInStock: res?.data?.countInStock,
                size: res?.data?.size,
                discount: res?.data?.discount
            })
        }
        setIsLoadingUpdate(false)
    }

    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateProductDetails)
        } else {
            form.setFieldsValue(inittial())
        }
    }, [form, stateProductDetails, isModalOpen])

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true)
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected, isOpenDrawer])

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true)
    }

    const handleDelteManyProducts = (ids) => {
        mutationDeletedMany.mutate({ids: ids, token: user?.access_token}, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        return res
    }

    const {data, isLoading, isSuccess, isError} = mutation
    const {
        data: dataUpdated,
        isLoading: isLoadingUpdated,
        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated
    } = mutationUpdate
    const {
        data: dataDeleted,
        isLoading: isLoadingDeleted,
        isSuccess: isSuccessDelected,
        isError: isErrorDeleted
    } = mutationDeleted
    const {
        data: dataDeletedMany,
        isLoading: isLoadingDeletedMany,
        isSuccess: isSuccessDelectedMany,
        isError: isErrorDeletedMany
    } = mutationDeletedMany


    const queryProduct = useQuery({queryKey: ['products'], queryFn: getAllProducts})
    const typeProduct = useQuery({queryKey: ['type-product'], queryFn: fetchAllTypeProduct})
    const {isLoading: isLoadingProducts, data: products} = queryProduct
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{color: 'red', fontSize: '30px', cursor: 'pointer'}}
                                onClick={() => setIsModalOpenDelete(true)}/>
                <EditOutlined style={{color: 'orange', fontSize: '30px', cursor: 'pointer'}}
                              onClick={handleDetailsProduct}/>
            </div>
        )
    }


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     // <Highlighter
        //     //   highlightStyle={{
        //     //     backgroundColor: '#ffc069',
        //     //     padding: 0,
        //     //   }}
        //     //   searchWords={[searchText]}
        //     //   autoEscape
        //     //   textToHighlight={text ? text.toString() : ''}
        //     // />
        //   ) : (
        //     text
        //   ),
    });


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '>= 50',
                    value: '>=',
                },
                {
                    text: '<= 50',
                    value: '<=',
                }
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.price >= 50
                }
                return record.price <= 50
            },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: '>= 3',
                    value: '>=',
                },
                {
                    text: '<= 3',
                    value: '<=',
                }
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return Number(record.rating) >= 3
                }
                return Number(record.rating) <= 3
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    const dataTable = products?.data?.length && products?.data?.map((product) => {
        return {...product, key: product._id}
    })

    useEffect(() => {
        if (isSuccess && data?.status === 'OK') {
            message.success()
            handleCancel()
        } else if (isError) {
            message.error()
        }
    }, [isSuccess])

    useEffect(() => {
        if (isSuccessDelectedMany && dataDeletedMany?.status === 'OK') {
            message.success()
        } else if (isErrorDeletedMany) {
            message.error()
        }
    }, [isSuccessDelectedMany])

    useEffect(() => {
        if (isSuccessDelected && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()
        } else if (isErrorDeleted) {
            message.error()
        }
    }, [isSuccessDelected])

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetails({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
            size: ''

        })
        form.resetFields()
    };

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success()
            handleCloseDrawer()
        } else if (isErrorUpdated) {
            message.error()
        }
    }, [isSuccessUpdated])

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }


    const handleDeleteProduct = () => {
        mutationDeleted.mutate({id: rowSelected, token: user?.access_token}, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            type: '',
            countInStock: '',
            size: '',
            discount: '',
        })
        form.resetFields()
    };

    const onFinish = () => {
        const params = {
            name: stateProduct.name,
            price: stateProduct.price,
            description: stateProduct.description,
            rating: stateProduct.rating,
            image: stateProduct.image,
            type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
            countInStock: stateProduct.countInStock,
            size: stateProduct.size,
            discount: stateProduct.discount
        }
        mutation.mutate(params, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        })
    }

    const handleOnchangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            type: typeProduct?.data?.data?.find((item) => item._id === e?.value)
        })
    }

    const handleOnchangeAvatar = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        })
    }

    const handleOnchangeAvatarDetails = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetails({
            ...stateProductDetails,
            image: file.preview
        })
    }
    const onUpdateProduct = () => {
        mutationUpdate.mutate({id: rowSelected, token: user?.access_token, ...stateProductDetails}, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleChangeSelect = (value) => {
        setStateProduct({
            ...stateProduct,
            type: value?.key
        })
    }
    const typeSelected = (value) => {
        const value_obj = {
            value: value?._id,
            label: value?.ten
        }
        return value_obj
    }

    const typeUpdateSelected = () => {
        const value_obj = {
            value: stateProductDetails['type']?._id,
            label: stateProductDetails['type']?.ten
        }
        console.log(value_obj)
        return value_obj
    }
    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{marginTop: '10px'}}>
                <Button style={{height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed'}}
                        onClick={() => setIsModalOpen(true)}><PlusOutlined style={{fontSize: '60px'}}/></Button>
            </div>
            <div style={{marginTop: '20px'}}>
                <TableComponent handleDelteMany={handleDelteManyProducts} columns={columns}
                                isLoading={isLoadingProducts} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            setRowSelected(record._id)
                        }
                    };
                }}/>
            </div>
            <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
                {/* <Loading isLoading={isLoading}> */}

                <Form
                    name="basic"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 18}}
                    onFinish={onFinish}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{required: true, message: 'Please input your name!'}]}
                    >
                        <InputComponent value={stateProduct['name']} onChange={handleOnchange} name="name"/>
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        valuePropName="_id"
                        initialValue={stateProduct.type}
                        rules={[{required: true, message: 'Please input your type!'}]}
                    >
                        <Select
                            name="type"
                            // defaultValue="lucy"
                            // style={{ width: 120 }}
                            value={stateProduct.type}
                            onChange={handleChangeSelect}
                            options={renderOptionsCategory(typeProduct?.data?.data)}
                            labelInValue={true}
                        />
                    </Form.Item>
                    {stateProduct.type === 'add_type' && (
                        <Form.Item
                            label='New type'
                            name="newType"
                            rules={[{required: true, message: 'Please input your type!'}]}
                        >
                            <InputComponent value={stateProduct.newType} onChange={handleOnchange} name="newType"/>
                        </Form.Item>
                    )}
                    <Form.Item
                        label="Count inStock"
                        name="countInStock"
                        rules={[{required: true, message: 'Please input your count inStock!'}]}
                    >
                        <InputComponent value={stateProduct.countInStock} onChange={handleOnchange}
                                        name="countInStock"/>
                    </Form.Item>
                    <Form.Item
                        label="Size"
                        name="size"
                        rules={[{required: true, message: 'Please input your Size!'}]}
                    >
                        <InputComponent value={stateProduct.countInStock} onChange={handleOnchange} name="size"/>
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{required: true, message: 'Please input your count price!'}]}
                    >
                        <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price"/>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{required: true, message: 'Please input your count description!'}]}
                    >
                        <InputComponent value={stateProduct.description} onChange={handleOnchange} name="description"/>
                    </Form.Item>
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{required: true, message: 'Please input your count rating!'}]}
                    >
                        <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating"/>
                    </Form.Item>
                    <Form.Item
                        label="Discount"
                        name="discount"
                        rules={[{required: true, message: 'Please input your discount of product!'}]}
                    >
                        <InputComponent value={stateProduct.discount} onChange={handleOnchange} name="discount"/>
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{required: true, message: 'Please input your count image!'}]}
                    >
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button>Select File</Button>
                            {stateProduct?.image && (
                                <img src={stateProduct?.image} style={{
                                    height: '60px',
                                    width: '60px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginLeft: '10px'
                                }} alt="avatar"/>
                            )}
                        </WrapperUploadFile>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 20, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                {/* </Loading> */}
            </ModalComponent>
            <DrawerComponent title='Chi tiết sản phẩm' isOpen={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}
                             width="90%">
                {/* <Loading isLoading={isLoadingUpdate || isLoadingUpdated}> */}

                <Form
                    name="basic"
                    labelCol={{span: 2}}
                    wrapperCol={{span: 22}}
                    onFinish={onUpdateProduct}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{required: true, message: 'Please input your name!'}]}
                    >
                        <InputComponent value={stateProductDetails['name']} onChange={handleOnchangeDetails}
                                        name="name"/>
                    </Form.Item>
                    <Form.Item
                        label="Type"
                        name="type"
                        valuePropName="_id"
                        rules={[{required: true, message: 'Please input your type!'}]}
                    >
                        <Select
                            name="type"
                            value={typeUpdateSelected()}
                            onChange={handleOnchangeDetails}
                            options={renderOptionsCategory(typeProduct?.data?.data)}
                            labelInValue={true}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Count inStock"
                        name="countInStock"
                        rules={[{required: true, message: 'Please input your count inStock!'}]}
                    >
                        <InputComponent value={stateProductDetails.countInStock} onChange={handleOnchangeDetails}
                                        name="countInStock"/>
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{required: true, message: 'Please input your count price!'}]}
                    >
                        <InputComponent value={stateProductDetails.price} onChange={handleOnchangeDetails}
                                        name="price"/>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{required: true, message: 'Please input your count description!'}]}
                    >
                        <InputComponent value={stateProductDetails.description} onChange={handleOnchangeDetails}
                                        name="description"/>
                    </Form.Item>
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{required: true, message: 'Please input your count rating!'}]}
                    >
                        <InputComponent value={stateProductDetails.rating} onChange={handleOnchangeDetails}
                                        name="rating"/>
                    </Form.Item>
                    <Form.Item
                        label="Discount"
                        name="discount"
                        rules={[{required: true, message: 'Please input your discount of product!'}]}
                    >
                        <InputComponent value={stateProductDetails.discount} onChange={handleOnchangeDetails}
                                        name="discount"/>
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{required: true, message: 'Please input your count image!'}]}
                    >
                        <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                            <Button>Select File</Button>
                            {stateProductDetails?.image && (
                                <img src={stateProductDetails?.image} style={{
                                    height: '60px',
                                    width: '60px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginLeft: '10px'
                                }} alt="avatar"/>
                            )}
                        </WrapperUploadFile>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 20, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            Apply
                        </Button>
                    </Form.Item>
                </Form>
                {/* </Loading> */}
            </DrawerComponent>
            <ModalComponent title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete}
                            onOk={handleDeleteProduct}>
                {/* <Loading isLoading={isLoadingDeleted}> */}
                <div>Bạn có chắc xóa sản phẩm này không?</div>
                {/* </Loading> */}
            </ModalComponent>
        </div>
    )
}

export default AdminProduct