import { createAsyncThunk } from '@reduxjs/toolkit';

export const verifyToken = createAsyncThunk(
    'admin/verifyToken',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/admin/verify', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();
            
            

            if (!data.authentication) return rejectWithValue('Not authenticated');

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const adminlogin = createAsyncThunk(
    'admin/login', 
    async ({username,password},{ rejectWithValue} )=>{
            try {
                
                
                const response=await fetch('/api/admin/login',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials:'include',
                    body: JSON.stringify({ username, password }),

                });

                if (!response.ok) {
                    const errorData = await response.json();
                    return rejectWithValue(errorData.message || 'Login failed');
                  }

                const data=await response.json()
                return data.admin
             

            } catch (error) {
                console.error(error )
            }
    }
)