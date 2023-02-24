import axios from 'axios';

const URL = 'https://expensetracker-a1878-default-rtdb.firebaseio.com/'


export async function storeExpense(expenseData, token) {

    const response = await axios.post(`${URL}/expenses.json/?auth=${token}`, expenseData);
    const id = response.data.name;
    return id;
}

export async function fetchExpenses(token) {
    const response = await axios.get(`${URL}/expenses.json/?auth=${token}`);

    const expenses = [];

    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        expenses.push(expenseObj);
    }

    return expenses;
}

export function updateExpense(id, expenseData, token) {
    return axios.put(`${URL}/expenses/${id}.json/?auth=${token}`, expenseData);
}

export function deleteExpense(id, token) {
    return axios.delete(`${URL}/expenses/${id}.json/?auth=${token}`);
}