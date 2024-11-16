import React, { useState, useEffect } from 'react';
import { supabase } from '../firebase';
import '../Assets/UserProfile.css';  // Import CSS file for styles
import UserDevicesTable from './deviceTable';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { mainHeader } from '../common';

const UserProfile = () => {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        avatar_url: '',
        group_name: '',
        user_type: '',
        is_admin: false
    });
    const [truckerToken,setTruckerToken] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Token state
    const [datToken, setDatToken] = useState('');
    const [directToken, setDirectToken] = useState('');
    const [truckstopToken, setTruckstopToken] = useState('');
    
    // Token input states
    const [datInput, setDatInput] = useState({ username: '', username_organization: '', password_organization: '', access_token: localStorage.getItem('dat_token') ? localStorage.getItem('dat_token') : '' });
    const [directInput, setDirectInput] = useState({ username: '', password: '', api_token: '' });
    const [truckstopInput, setTruckstopInput] = useState({ client_id: '', client_secret: '', username: '', password: '' });
    
    const uid = useSelector((state) => state.user.userID)
    console.log(uid)
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                const { data: { user } } = await axios.get(`https://dr48nfhb-5000.use.devtunnels.ms/users?user_id=${JSON.parse(localStorage.getItem('authentication'))?.user?.id}`,{
                    headers: mainHeader()
                  });
                if (user?.data?.length) {
                    setProfile({
                        username: user?.data?.[0]?.username || '',
                        email: user?.data?.[0]?.email,
                        avatar_url: user?.data?.[0]?.avatar_url || '',
                        group_name: user?.data?.[0]?.group_name || '',
                        user_type: user?.data?.[0]?.user_type || '',
                        is_admin: user?.data?.[0]?.is_admin || false
                    });
                }
            } catch (err) {
                setError('Failed to fetch user profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleFileChange = (e) => {
        setAvatarFile(e.target.files[0]);
    };

    const uploadAvatar = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('https://dr48nfhb-5000.use.devtunnels.ms/upload-avatar', formData, {
                    headers: mainHeader()
                });
                
                if(!response) throw "error"

                const response1 = await axios.get('https://dr48nfhb-5000.use.devtunnels.ms/get-avatar', {
                    headers: mainHeader()
                });
    
                if (response1.status === 200) {
                    return response1.data.avatar_url;
                }
            }
            catch (err) {
                setError('Error uploading avatar.');
                console.error(err.message);
                return null;
            }
        } catch (err) {
            setError('Error uploading avatar.');
            console.error(err.message);
            return null;
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            let avatarUrl = profile.avatar_url;

            if (avatarFile) {
                avatarUrl = await uploadAvatar(avatarFile);
            }

            const { data } = await axios.put(`https://dr48nfhb-5000.use.devtunnels.ms/users?user_id=${JSON.parse(localStorage.getItem('authentication'))?.user?.id}`,
            {
                email: profile.email,               
                username: profile.username,
                avatar_url: avatarUrl,
                group_name: profile.group_name,
                user_type: profile.user_type,
                is_admin: profile.is_admin
            },
            {
            headers: mainHeader()
              })

            if (!data) throw "error";

            setEditing(false);
            setProfile({
                ...profile,
                avatar_url: avatarUrl
            });
        } catch (err) {
            setError('Error updating profile.');
        } finally {
            setLoading(false);
        }
    };

    // Functions to fetch tokens
    const fetchDatToken = async () => {
        try {
            const response = await fetch('https://dr48nfhb-5000.use.devtunnels.ms/dat_token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datInput)
            });
            const data = await response.json();
            if (data.access_token) {
                setDatToken(data.dat_user_access_token?.dat_user_access_token);
                localStorage.setItem('dat_token',data.dat_user_access_token?.access_token);
                localStorage.removeItem('token')
            } else {
                setError(data.message || 'Failed to fetch DAT token.');
            }
        } catch (err) {
            setError('Error fetching DAT token.');
        }
    };

    const fetchDirectToken = async () => {
        try {
            const response = await fetch('https://dr48nfhb-5000.use.devtunnels.ms/direct_token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(directInput)
            });
            const data = await response.json();
            if (data.access_token) {
                setDirectToken(data.access_token);
                localStorage.removeItem('direct_token')
                localStorage.setItem('direct-api-key',directInput.api_token)
            } else {
                setError(data.message || 'Failed to fetch Direct token.');
            }
        } catch (err) {
            setError('Error fetching Direct token.');
        }
    };

    const fetchTruckstopToken = async () => {
        try {
            const response = await fetch('https://dr48nfhb-5000.use.devtunnels.ms/truckstop_token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(truckstopInput)
            });
            const data = await response.json();
            if (data.access_token) {
                setTruckstopToken(data.access_token);
                localStorage.removeItem('trucks_token')
            } else {
                setError(data.message || 'Failed to fetch Truckstop token.');
            }
        } catch (err) {
            setError('Error fetching Truckstop token.');
        }
    };

    // Function to copy token to clipboard
    const copyToClipboard = (token) => {
        navigator.clipboard.writeText(token)
            .then(() => alert('Token copied to clipboard!'))
            .catch(err => setError('Failed to copy token.'));
    };

    return (
        <div className="profile-container">
            <h1 className="profile-title">User Profile</h1>
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}
            <div className='user-details'>
            <div className="profile-form">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="form-input"
                        value={profile.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        disabled={!editing}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-input"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!editing}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="group_name" className="form-label">Group Name:</label>
                    <input
                        type="text"
                        id="group_name"
                        name="group_name"
                        className="form-input"
                        value={profile.group_name}
                        onChange={(e) => setProfile({ ...profile, group_name: e.target.value })}
                        disabled={!editing}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="user_type" className="form-label">User Type:</label>
                    <input
                        type="text"
                        id="user_type"
                        name="user_type"
                        className="form-input"
                        value={profile.user_type}
                        onChange={(e) => setProfile({ ...profile, user_type: e.target.value })}
                        disabled={!editing}
                    />
                </div>

                {profile.role == 'admin' && <div className="form-group">
                    <label htmlFor="is_admin" className="form-label">Admin:</label>
                    <input
                        type="checkbox"
                        id="is_admin"
                        name="is_admin"
                        className="form-checkbox"
                        checked={profile.is_admin}
                        onChange={(e) => setProfile({ ...profile, is_admin: e.target.checked })}
                        disabled={!editing}
                    />
                </div>}

                <div className="form-group">
                    <label htmlFor="avatar" className="form-label">Avatar:</label>
                    <input
                        type="file"
                        id="avatar"
                        className="form-input avatar-input"
                        onChange={handleFileChange}
                        style={{ display: 'none' }} /* Hide the default input */
                        disabled={!editing}
                    />
                    <button onClick={() => document.getElementById('avatar').click()} className="btn btn-file" disabled={!editing}>
                        Upload Avatar
                    </button>
                    {profile.avatar_url && (
                        <div className="avatar-group">
                            <img src={profile.avatar_url} alt="Avatar" className="profile-avatar" />
                        </div>
                    )}
                </div>

                {editing && (
                    <div className="form-actions">
                        <button onClick={handleSave} className="btn btn-primary">Save</button>&nbsp;&nbsp;
                        <button onClick={() => setEditing(false)} className="btn btn-secondary">Cancel</button>
                    </div>
                )}
                {!editing && (
                    <div className="detail-actions">
                        <button onClick={() => setEditing(true)} className="btn btn-edit">Edit Profile</button>
                    </div>
                )}
            </div>
            <div className='table-device'>
                <h2 className="token-title">Truckstop</h2>
                <div className="form-group">
                    <label htmlFor="truckstop-client-id" className="form-label">Truckstop Client ID:</label>
                    <input
                        type="text"
                        id="truckstop-client-id"
                        name="truckstop-client-id"
                        className="form-input"
                        value={truckstopInput.client_id}
                        onChange={(e) => setTruckstopInput({ ...truckstopInput, client_id: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="truckstop-client-secret" className="form-label">Truckstop Client Secret:</label>
                    <input
                        type="password"
                        id="truckstop-client-secret"
                        name="truckstop-client-secret"
                        className="form-input"
                        value={truckstopInput.client_secret}
                        onChange={(e) => setTruckstopInput({ ...truckstopInput, client_secret: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="truckstop-username" className="form-label">Truckstop Username:</label>
                    <input
                        type="text"
                        id="truckstop-username"
                        name="truckstop-username"
                        className="form-input"
                        value={truckstopInput.username}
                        onChange={(e) => setTruckstopInput({ ...truckstopInput, username: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="truckstop-password" className="form-label">Truckstop Password:</label>
                    <input
                        type="password"
                        id="truckstop-password"
                        name="truckstop-password"
                        className="form-input"
                        value={truckstopInput.password}
                        onChange={(e) => setTruckstopInput({ ...truckstopInput, password: e.target.value })}
                    />
                </div>
                <button onClick={fetchTruckstopToken} className="btn btn-primary">Generate Truckstop Token</button>
                {truckstopToken && (
                    <div className="token-display">
                        <br/>
                        <input
                        type="text"
                        id="truckstop-token"
                        name="truckstop-token"
                        className="form-input"
                        value={truckstopToken}
                    />
                        <button onClick={() => {localStorage.setItem('trucks_token',truckstopToken);localStorage.setItem('trucksCredential',JSON.stringify(truckstopInput));}} className="btn btn-copy">{localStorage.getItem('trucks_token')?.length ? 'applied':'apply'}</button>
                    </div>
                )}
            </div>
            </div>
            <div className='token-container'>
            <div className="token-section">
                <h2 className="token-title">DAT</h2>
                <div className="form-group">
                    <label htmlFor="dat-username" className="form-label">DAT Username:</label>
                    <input
                        type="text"
                        id="dat-username"
                        name="dat-username"
                        className="form-input"
                        value={datInput.username}
                        onChange={(e) => setDatInput({ ...datInput, username: e.target.value })}
                    />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="dat-password" className="form-label">DAT Password:</label>
                    <input
                        type="password"
                        id="dat-password"
                        name="dat-password"
                        className="form-input"
                        value={datInput.password}
                        onChange={(e) => setDatInput({ ...datInput, password: e.target.value })}
                    />
                </div> */}
                <div className="form-group">
                    <label htmlFor="dat-username-org" className="form-label">DAT Organization Username:</label>
                    <input
                        type="text"
                        id="dat-username-org"
                        name="dat-username-org"
                        className="form-input"
                        value={datInput.username_organization}
                        onChange={(e) => setDatInput({ ...datInput, username_organization: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dat-password-org" className="form-label">DAT Organization Password:</label>
                    <input
                        type="password"
                        id="dat-password-org"
                        name="dat-password-org"
                        className="form-input"
                        value={datInput.password_organization}
                        onChange={(e) => setDatInput({ ...datInput, password_organization: e.target.value })}
                    />
                </div>
                <button onClick={fetchDatToken} className="btn btn-primary">Generate DAT Token</button>
                {datToken && (
                    <div className="token-display">
                        <br/>
                        <input
                        type="text"
                        id="dat-token"
                        name="dat-token"
                        className="form-input"
                        value={datToken}
                    />
                        <button onClick={() => {localStorage.setItem('token',datToken);localStorage.setItem('datCredential',JSON.stringify(datInput));}} className="btn btn-copy">{localStorage.getItem('token')?.length ? 'Applied':'Apply'}</button>
                    </div>
                )}
            </div>

            <div className="token-section">
                <h2 className="token-title">Direct Freight</h2>
                <div className="form-group">
                    <label htmlFor="direct-username" className="form-label">Direct Username:</label>
                    <input
                        type="text"
                        id="direct-username"
                        name="direct-username"
                        className="form-input"
                        value={directInput.username}
                        onChange={(e) => setDirectInput({ ...directInput, username: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="direct-password" className="form-label">Direct Password:</label>
                    <input
                        type="password"
                        id="direct-password"
                        name="direct-password"
                        className="form-input"
                        value={directInput.password}
                        onChange={(e) => setDirectInput({ ...directInput, password: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="direct-api-token" className="form-label">Direct API Token:</label>
                    <input
                        type="text"
                        id="direct-api-token"
                        name="direct-api-token"
                        className="form-input"
                        value={directInput.api_token}
                        onChange={(e) => setDirectInput({ ...directInput, api_token: e.target.value })}
                    />
                </div>
                <button onClick={fetchDirectToken} className="btn btn-primary">Generate Direct Token</button>
                {directToken && (
                    <div className="token-display">
                        <br/>
                        <input
                        type="text"
                        id="dat-token"
                        name="dat-token"
                        className="form-input"
                        value={directToken}
                    />
                        <button onClick={() => localStorage.setItem('direct_token',directToken)} className="btn btn-copy">{localStorage.getItem('direct_token')?.length ? 'Applied':'Apply'}</button>
                    </div>
                )}
            </div>
            </div>
            <div style={{textAlign:'left'}}>
                    <div className="token-display">
                        <br/>
                        <input
                        type="text"
                        id="trucker-token"
                        name="trucker-token"
                        className="form-input"
                        placeholder='Truckerpath Token'
                        value={truckerToken}
                        onChange={(e)=>setTruckerToken(e.target.value)}
                        required
                    />
                        <button onClick={() => localStorage.setItem('trucker_token',truckerToken)} className="btn btn-copy">{localStorage.getItem('trucker_token')?.length ? 'Applied':'Apply'}</button>
                    </div>
               </div>
            {uid?.role === 'admin' && <div className='token-container'>
            <UserDevicesTable userId={uid?.id}/>
            </div>}
        </div>
    );
};

export default UserProfile;
