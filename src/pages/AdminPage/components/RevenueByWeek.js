import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const RevenueByWeek = () => {
    const [startDate, setStartDate] = useState(null);
    const [finishDate, setFinishDate] = useState(null);
    const [result, setResult] = useState(null);

    const handleGetRevenue = async () => {
        try {
            const startYear = startDate.getFullYear();
            const startMonth = startDate.getMonth() + 1; // Tháng bắt đầu từ 0

            const finishYear = finishDate.getFullYear();
            const finishMonth = finishDate.getMonth() + 1;

            const response = await fetch('/api/order/getRevenueByWeek', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startDate: {year: startYear, month: startMonth},
                    finishDate: {year: finishYear, month: finishMonth},
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h2>Thống kê doanh thu theo khoảng ngày</h2>

            {/* Dòng bộ lọc */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <label>Select Start Date:</label>
                    <DatePicker className="form-control" selected={startDate} onChange={(date) => setStartDate(date)}/>
                </div>
                <div className="col-md-4">
                    <label>Select Finish Date:</label>
                    <DatePicker className="form-control" selected={finishDate}
                                onChange={(date) => setFinishDate(date)}/>
                </div>
                <div className="col-md-4">
                    <button className="btn btn-primary" onClick={handleGetRevenue}>
                        Get Revenue
                    </button>
                </div>
            </div>

            {/* Dòng kết quả */}
            {result && (
                <div className="row">
                    <div className="col-md-12">
                        <h3>Result:</h3>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Tuần</th>
                                <th scope="col">Tổng doanh thu</th>
                            </tr>
                            </thead>
                            <tbody>
                            {result.data.map((weekData, index) => (
                                <tr key={index}>
                                    <th scope="row">{weekData._id.week}</th>
                                    <td>{weekData.totalRevenue}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RevenueByWeek;
