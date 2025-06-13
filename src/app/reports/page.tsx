"use client"

import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { ReportData } from '@/types/report';

const Subjects = [
    'math',
    'literature',
    'foreignLanguage',
    'physics',
    'chemistry',
    'biology',
    'history',
    'geography',
    'civics'
];


export default function Reports() {
    const [reportData, setReportData] = useState<ReportData[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<string>('math');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await api.get(`students/reports/grade-distribution?subject=${selectedSubject}`);

                // Đảm bảo dữ liệu có định dạng chính xác
                if (response.data && response.data.data && response.data.data.length > 0) {
                    setReportData(response.data.data);
                } else {
                    setReportData([]);
                }
            } catch (err) {
                setError('Không thể tải dữ liệu báo cáo. Vui lòng thử lại sau.');
                console.error('Lỗi khi tải dữ liệu:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReportData();
    }, [selectedSubject]);

    // Chuyển đổi tên môn học thành tiếng Việt
    const getSubjectName = (subject: string) => {
        const subjectNames: Record<string, string> = {
            math: 'math',
            literature: 'literature',
            foreignLanguage: 'foreign language',
            physics: 'physics',
            chemistry: 'chemistry',
            biology: 'biology',
            history: 'history',
            geography: 'geography',
            civics: 'civics education'
        };
        return subjectNames[subject] || subject;
    };

    // Chuẩn bị dữ liệu cho biểu đồ
    const chartData = reportData.length > 0 ? [
        { name: '≥ 8', value: reportData[0][">=8"] },
        { name: '6 - 7.99', value: reportData[0]["6-7.99"] },
        { name: '4 - 5.99', value: reportData[0]["4-5.99"] },
        { name: '< 4', value: reportData[0]["<4"] },
    ] : [];

    // Tính Amount thí sinh
    const totalStudents = chartData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="mt-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Score Test Statistics Report</h1>
                <p className="text-gray-600 mt-2">Analyze test scores by subject</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Panel chọn môn học */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Choose subject</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Chọn môn học" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Subjects.map(subject => (
                                        <SelectItem key={subject} value={subject}>
                                            {getSubjectName(subject)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {loading ? (
                                <div className="space-y-4">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-2/3" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            ) : error ? (
                                <div className="text-red-500 bg-red-50 p-4 rounded-lg">
                                    {error}
                                </div>
                            ) : reportData.length === 0 ? (
                                <div className="text-gray-500 bg-gray-50 p-4 rounded-lg">
                                    No data available
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-blue-800">The number of candidate</h3>
                                        <p className="text-2xl font-bold text-blue-700">{totalStudents.toLocaleString()}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                                                <span className="text-sm">≥ 8</span>
                                            </div>
                                            <span className="font-medium">{reportData[0][">=8"].toLocaleString()}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                                                <span className="text-sm">6 - 7.99</span>
                                            </div>
                                            <span className="font-medium">{reportData[0]["6-7.99"].toLocaleString()}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                                                <span className="text-sm">4 - 5.99</span>
                                            </div>
                                            <span className="font-medium">{reportData[0]["4-5.99"].toLocaleString()}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <div className="w-3 h-3 bg-rose-500 rounded-full mr-2"></div>
                                                <span className="text-sm">&lt; 4</span>
                                            </div>
                                            <span className="font-medium">{reportData[0]["<4"].toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Biểu đồ thống kê */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>
                            Grade distribution {getSubjectName(selectedSubject)}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="h-80 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
                            </div>
                        ) : error ? (
                            <div className="h-80 flex flex-col items-center justify-center text-center p-4">
                                <div className="text-red-500 text-lg mb-4">{error}</div>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : reportData.length === 0 ? (
                            <div className="h-80 flex items-center justify-center text-gray-500">
                                No data available to illustrate charts
                            </div>
                        ) : (
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip
                                            formatter={(value) => [`${value.toLocaleString()} candiates`, 'Total']}
                                            labelFormatter={(value) => `Group: ${value}`}
                                        />
                                        <Legend />
                                        <Bar
                                            dataKey="value"
                                            name="total"
                                            fill="#3b82f6"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Bảng dữ liệu chi tiết */}
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Grade Distribution Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">≥ 8</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">6 - 7.99</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">4 - 5.99</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">&lt; 4</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-4 text-center">
                                            <div className="flex justify-center">
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-700"></div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-4 text-red-500 text-center">
                                            {error}
                                        </td>
                                    </tr>
                                ) : reportData.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-4 text-gray-500 text-center">
                                            Không có dữ liệu
                                        </td>
                                    </tr>
                                ) : (
                                    reportData.map((data, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                                {getSubjectName(data.subject)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-emerald-600">
                                                {data[">=8"].toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-blue-600">
                                                {data["6-7.99"].toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-amber-600">
                                                {data["4-5.99"].toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-rose-600">
                                                {data["<4"].toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right font-bold">
                                                {(
                                                    data[">=8"] +
                                                    data["6-7.99"] +
                                                    data["4-5.99"] +
                                                    data["<4"]
                                                ).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}