import React from 'react';
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { loginManager } from '@/redux/dashboard/actions';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = () => {
    const { username, password } = form.getFieldsValue()
    dispatch(loginManager(username, password, () => {
      navigate("/");
    }));
  }

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      <Form
        layout="vertical"
        form={form}
        className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'
      >
        <Form.Item name="username" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input type="password" />
        </Form.Item>
        <div>
          <button
            onClick={handleLogin}
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </Form>
    </div>
  );
}

export default SignIn;
