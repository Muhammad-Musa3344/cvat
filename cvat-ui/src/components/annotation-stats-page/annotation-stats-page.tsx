// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import {
    Alert, Button, Empty, Spin,
} from 'antd';
import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface ClassCount {
    label: string;
    count: number;
}

const TOP_CLASSES = 15;

export default function AnnotationStatsPage(props: RouteComponentProps<{ tid: string }>): JSX.Element {
    const { match: { params: { tid } } } = props;
    const [counts, setCounts] = useState<ClassCount[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        setCounts(null);
        setError(null);
        fetch(`/api/tasks/${tid}/annotation-stats`, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setCounts(data.counts))
            .catch((err: Error) => setError(err.message));
    }, [tid, attempt]);

    if (error) {
        return (
            <Alert
                type='error'
                message='Could not load annotation counts'
                description={error}
                action={<Button onClick={() => setAttempt(attempt + 1)}>Retry</Button>}
            />
        );
    }
    if (counts === null) {
        return <Spin />;
    }
    if (counts.length === 0) {
        return <Empty description='This task has no annotations yet' />;
    }

    const top = counts.slice(0, TOP_CLASSES);
    return (
        <div style={{ maxWidth: 900, margin: '24px auto' }}>
            <h2>{`Annotations per class (top ${top.length} of ${counts.length})`}</h2>
            <Bar
                data={{
                    labels: top.map((item) => item.label),
                    datasets: [{ label: 'Annotations', data: top.map((item) => item.count) }],
                }}
                options={{ plugins: { legend: { display: false } } }}
            />
        </div>
    );
}