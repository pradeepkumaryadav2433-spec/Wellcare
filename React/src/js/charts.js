import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);


export function createBarChart(moods) {
    return {
        labels: moods.map((mood) =>
            new Date(mood.created_at).toLocaleDateString()
        ),

        datasets: [
            {
                label: "Happy",
                data: moods.map((mood) => mood.happy),
            },
            {
                label: "Tensed",
                data: moods.map((mood) => mood.tensed),
            },
            {
                label: "Angry",
                data: moods.map((mood) => mood.angry),
            },
            {
                label: "Motivated",
                data: moods.map((mood) => mood.motivated),
            },
            {
                label: "Fear",
                data: moods.map((mood) => mood.fear),
            },
            {
                label: "Relaxed",
                data: moods.map((mood) => mood.relaxed),
            }
        ]
    };
}


export function createBarChartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,

        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 10
            }
        }
    };
}


export function createPieChart(moods) {
    const totals = {
        happy: 0,
        tensed: 0,
        angry: 0,
        motivated: 0,
        fear: 0,
        relaxed: 0
    };

    moods.forEach((mood) => {
        totals.happy += Number(mood.happy);
        totals.tensed += Number(mood.tensed);
        totals.angry += Number(mood.angry);
        totals.motivated += Number(mood.motivated);
        totals.fear += Number(mood.fear);
        totals.relaxed += Number(mood.relaxed);
    });

    return {
        labels: [
            "Happy",
            "Tensed",
            "Angry",
            "Motivated",
            "Fear",
            "Relaxed"
        ],

        datasets: [
            {
                data: [
                    totals.happy,
                    totals.tensed,
                    totals.angry,
                    totals.motivated,
                    totals.fear,
                    totals.relaxed
                ]
            }
        ]
    };
}


export function createPieChartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false
    };
}