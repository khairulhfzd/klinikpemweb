// utils/auth.js

// Fungsi untuk memeriksa apakah pengguna sudah login (berdasarkan adanya token)
export const isAuthenticated = () => {
    // Menggunakan kunci 'userToken' agar konsisten dengan fungsi login
    return localStorage.getItem('userToken') !== null;
};

// Fungsi untuk mendapatkan ID pengguna yang sedang login
export const getLoggedInUserId = () => {
    // Mengambil ID pengguna dari localStorage yang disimpan saat login
    return localStorage.getItem('loggedInUserId');
};

// Fungsi untuk mendapatkan peran pengguna (jika ada)
export const getRole = () => {
    // Menggunakan kunci 'userRole' agar konsisten dengan fungsi login
    return localStorage.getItem('userRole');
};

// Fungsi untuk login (simulasi)
// Dalam aplikasi nyata, ini akan berinteraksi dengan API backend dan menerima respons dari sana
export const login = (userId, userToken, userRole) => {
    // Simpan ID pengguna, token, dan peran ke localStorage
    localStorage.setItem('loggedInUserId', userId.toString());
    localStorage.setItem('userToken', userToken);
    localStorage.setItem('userRole', userRole);
};

// Fungsi untuk logout
export const logout = () => {
    // Hapus semua item terkait login dari localStorage
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
};
