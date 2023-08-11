import React from 'react';
import NavBar from '@/components/reusable/NavBar';
import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Footer from '@/components/reusable/Footer';

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Morent',
  description: 'The Best Platform for Car Rental',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NavBar />
      <body className={plusJakartaSans.className}>{children}</body>
      <Footer />
    </html>
  );
}
