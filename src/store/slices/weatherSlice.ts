import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  conditions: string;
  timestamp: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  dt: number;
}

interface WeatherState {
  data: Record<string, WeatherData>;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: {},
  loading: false,
  error: null,
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (cities: string[]) => {
    const responses = await Promise.all(
      cities.map(async (city) => {
        const response = await axios.get(`/api/weather?city=${encodeURIComponent(city)}`);
        
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        
        return {
          city,
          temperature: response.data.main.temp,
          humidity: response.data.main.humidity,
          conditions: response.data.weather[0].main,
          timestamp: Date.now(),
          main: response.data.main,
          wind: response.data.wind,
          weather: response.data.weather,
          dt: response.data.dt,
        };
      })
    );
    return responses;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.forEach((weatherData) => {
          state.data[weatherData.city] = weatherData;
        });
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      });
  },
});

export default weatherSlice.reducer; 