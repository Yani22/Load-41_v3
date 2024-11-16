import React, { useEffect, useState } from 'react';
import { supabase } from '../firebase'
import axios from 'axios';
import { mainHeader } from '../common';

const UserDevicesTable = ({ userId }) => {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const fetchUserDevices = async () => {
            const { data } = await axios.get(`https://dr48nfhb-5000.use.devtunnels.ms/user_logins?user_id=${userId}`,{
                headers: mainHeader()
            }
            )

            if (!data?.data) {
                console.error('Error fetching user devices:', "error");
            } else {
                setDevices(data?.data);
            }
        };

        fetchUserDevices();
    }, [userId]);

    return (
        <div className='logged-in-users'>
            <p>Logged-In Devices</p>
            <table border="1" cellPadding="10" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Browser</th>
                        <th>Browser Version</th>
                        <th>OS</th>
                        <th>OS Version</th>
                        <th>OS Version Name</th>
                        <th>Platform</th>
                        <th>Engine</th>
                        <th>Location</th>
                        <th>Login Time</th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map((device) => (
                        <tr key={device.id}>
                            <td>{JSON.parse(device?.device_info)?.browser?.name || ''}</td>
                            <td>{JSON.parse(device?.device_info)?.browser?.version || ''}</td>
                            <td>{JSON.parse(device?.device_info)?.os?.name || ''}</td>
                            <td>{JSON.parse(device?.device_info)?.os?.version || ''}</td>
                            <td>{JSON.parse(device?.device_info)?.os?.versionName || ''}</td>
                            <td>{JSON.parse(device?.device_info)?.platform?.type || ''}</td>
                            <td>{JSON.parse(device?.device_info)?.engine?.name || ''}</td>
                            <td>{device?.location || ''}</td>
                            <td>{new Date(device?.login_time).toLocaleString() || ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserDevicesTable;
