// src/components/controllers/SearchController.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Updated import to useNavigate
import axios from 'axios';
import PageValues from '../../utils/constants/PageValues';

// Replace all instances of `useHistory` with `useNavigate` in the code logic
