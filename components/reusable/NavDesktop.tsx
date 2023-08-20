'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as Avatar from '@radix-ui/react-avatar';
import { Session, User } from '@supabase/supabase-js';
import { useTheme } from 'next-themes';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import Button from '@/components/reusable/Button';
import { Popover, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import Sun from './Sun';
import ToggleTheme from './ToggleTheme';

const NavDesktop = ({ session }: { session: Session | null }) => {
  const { theme, setTheme } = useTheme();
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(session?.user);
  const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(
    session?.user?.user_metadata?.avatar_url,
  );

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase]);

  useEffect(() => {
    if (avatarUrl) return;
    const getAvatar = async () => {
      const { data } = await supabase
        .from('profiles')
        .select(`avatar_url`)
        .eq(`id`, user?.id)
        .single();
      setAvatarUrl(data?.avatar_url);
    };
    getAvatar();
  }, [user, supabase, avatarUrl]);

  const handleOAuth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUser(null);
    router.refresh();
  };

  return (
    <nav className='sticky top-0 z-40 flex h-[100px] w-full items-center border-b border-b-slate-300/40 bg-white'>
      <ul className='padding-layout flex w-full flex-row items-center justify-between '>
        <Link href='/'>
          <Image src={'/img/logo.svg'} width={148} height={44} alt={'logo'} />
        </Link>
        <div className='flex items-center justify-between gap-x-9 text-base font-medium text-slate-600'>
          <li className='hover:text-blue-500'>
            <Link href='/'>Home</Link>
          </li>
          <li className='hover:text-blue-500'>
            <Link href='/search'>Search</Link>
          </li>
          <li className='hover:text-blue-500'>
            <Link href='/addcar'>Add Car</Link>
          </li>
          {session || user ? (
            <Popover className='relative z-20'>
              <Popover.Button className='focus:outline-none'>
                <Avatar.Root>
                  <Avatar.Image
                    className='h-10 rounded-full'
                    src={avatarUrl!}
                  />
                  <Avatar.Fallback
                    className='h-10 rounded-full bg-slate-800'
                    delayMs={600}
                  />
                </Avatar.Root>
              </Popover.Button>
              <Transition
                enter='transition duration-100 ease-out'
                enterFrom='transform scale-95 opacity-0'
                enterTo='transform scale-100 opacity-100'
                leave='transition duration-75 ease-out'
                leaveFrom='transform scale-100 opacity-100'
                leaveTo='transform scale-95 opacity-0'
              >
                <Popover.Panel className='absolute right-0 z-20 flex w-56 flex-col gap-3 rounded-lg border border-blue-50 bg-white p-4'>
                  <button className='flex h-14 w-full items-center justify-center gap-2 rounded-md border border-blue-50 bg-white hover:bg-white-200'>
                    <Avatar.Root>
                      <Avatar.Image
                        className='h-6 rounded-full'
                        src={avatarUrl ?? '/img/placeholder-avatar.jpg'}
                      />
                      <Avatar.Fallback className='h-6 rounded-full bg-slate-800' />
                    </Avatar.Root>
                    <span className='font-semibold text-blue-500'>
                      My Profile
                    </span>
                  </button>
                  <Button
                    title={'Logout'}
                    href='#'
                    style={
                      'flex h-14 w-full items-center justify-center gap-2 rounded-md bg-red-400 text-white font-semibold hover:bg-red-700'
                    }
                    handleClick={handleLogout}
                  />
                </Popover.Panel>
              </Transition>
            </Popover>
          ) : (
            <Button
              title={'Login'}
              href='#'
              style={'btn-login w-[116px] hover:opacity-80'}
              handleClick={handleOAuth}
            />
          )}
          <Image src={'/Icons/line.svg'} height={36} width={2} alt={'line'} />
          <ToggleTheme />
        </div>
      </ul>
    </nav>
  );
};

export default NavDesktop;
