const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng Nhập</h1>
        <form action="">
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email: </label>
                <input type="text" id="email" placeholder="Nhập vào email của bạn...." className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring focus-blue-200 h-11"/>
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Mật khẩu: </label>
                <input type="password" id="password" placeholder="Nhập vào mật khẩu của bạn...." className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring focus-blue-200 h-11"/>
            </div>

            <div className="mb-6">
                <button type="submit" className="w-full bg-blue-500 text-white hover:blue-700 py-3 rounded-xl">
                        Đăng Nhập
                </button>
            </div>
            <p className="text-center text-gray-700">
                <a href="/" className="text-blue-700">Quên mật khẩu?</a>
            </p>
        </form>
      </div>
    </div>
  )
}

export default Login