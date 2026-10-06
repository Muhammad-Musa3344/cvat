// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Button, Empty, Spin } from 'antd';

interface ClassCount {
    label: string;
    count: number;
}

export default function ClassCountsPage(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const [counts, setCounts] = useState<ClassCount[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/test/tasks/${id}/class-counts`, { credentials: 'same-origin' });
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            setCounts(await response.json());
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Request failed');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        load();
    }, [load]);

    if (loading) {
        return <Spin style={{ margin: 24 }} />;
    }

    if (error) {
        return (
            <Alert
                style={{ margin: 24 }}
                type='error'
                message='Could not load class counts'
                description={error}
                action={<Button onClick={load}>Retry</Button>}
            />
        );
    }

    if (!counts || counts.length === 0) {
        return <Empty style={{ margin: 24 }} description='No annotations' />;
    }

    const max = Math.max(...counts.map((item) => item.count));
    return (
        <div style={{ margin: 24, maxWidth: 720 }}>
            <h3>{`Annotations per class (task ${id})`}</h3>
            {counts.map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ width: 120 }}>{item.label}</span>
                    <div style={{ background: '#1890ff', height: 20, width: `${(item.count / max) * 100}%` }} />
                    <span style={{ marginLeft: 8 }}>{item.count}</span>
                </div>
            ))}
        </div>
    );
}