import axios from 'axios';
import { Parser as CsvParser } from 'json2csv';
import * as fs from 'fs';

const BASE_URL = 'https://rauenagentur.de/coaches/';

async function fetchCoachData() {
    try {
        const { data } = await axios.get(BASE_URL);
        // Parsing logic here (for simplicity, assuming a specific structure)
        const coaches = parseCoachData(data);
        return coaches;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function parseCoachData(html: string) {
    // Implement the logic to parse HTML and extract coach data
    // Returning mock data for example
    return [
        { name: 'John Doe', specialty: 'Team Coaching' },
        { name: 'Jane Smith', specialty: 'Executive Coaching' },
    ];
}

function exportToJson(coaches: any[]) {
    fs.writeFileSync('coaches.json', JSON.stringify(coaches, null, 2));
}

function exportToCsv(coaches: any[]) {
    const csvParser = new CsvParser();
    const csv = csvParser.parse(coaches);
    fs.writeFileSync('coaches.csv', csv);
}

async function main() {
    const coaches = await fetchCoachData();
    if (coaches) {
        exportToJson(coaches);
        exportToCsv(coaches);
    }
}

main();