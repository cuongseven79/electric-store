'use client';
import { signIn, useSession } from 'next-auth/react';
import { Icon } from './icon';
import { faClose, faCross } from '@fortawesome/free-solid-svg-icons';
import api from '@/lib/api';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Popconfirm,
  Space,
  message,
} from 'antd';
import { redirect, useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';

const UserInfoModal = ({ handleToggle }) => {
  const { data: session, status } = useSession();

  const _handelUpdate = async (data: any) => {
    try {
      await api(`/api/staffs/${session.user.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
      message.success('Staff updated successfully.');
      handleToggle((v) => !v);
    } catch (error) {
      message.error('Failed to update staff.');
    }
  };
  return (
    status == 'authenticated' && (
      <div className=" absolute z-50  m-auto flex h-[100vh] w-full flex-col gap-6 rounded-md ">
        <div className="m-auto w-[350px] rounded bg-white p-2 pb-10 shadow-lg">
          <div className="flex justify-between p-2">
            <h2 className="text-xl">User information</h2>
            <button onClick={() => handleToggle && handleToggle((v) => !v)}>
              <Icon icon={faClose} />
            </button>
          </div>
          <div className="flex flex-col justify-center p-2">
            <Form
              autoComplete="off"
              initialValues={{
                fullname: session.user.name,
                email: session.user.email,
              }}
              onFinish={_handelUpdate}
              layout="vertical"
            >
              <Form.Item label="Full name" name="fullname">
                <Input disabled={session.user.role == 'USER'} />
              </Form.Item>

              <Form.Item label="Email" name="email">
                <Input type="email" disabled />
              </Form.Item>
              {session.user.role !== 'USER' && (
                <>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        message: 'Please input your password!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="confirm-password"
                    label="Confirm password"
                    dependencies={['password']}
                    rules={[
                      {
                        required: true,
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              'The new password that you entered do not match!',
                            ),
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Space>
                      <button className="button" type="submit">
                        Update
                      </button>
                    </Space>
                  </Form.Item>
                </>
              )}
            </Form>
          </div>
        </div>
      </div>
    )
  );
};

export default UserInfoModal;
