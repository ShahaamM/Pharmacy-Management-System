import React, { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom' 
import logo from '../assets/Logo.svg'
import PromotionManagement from '../pages/PromotionManagement/PromotionManagement';
import PromotionCreateForm from '../pages/PromotionManagement/PromotionCreateForm';
import PromotionUpdateForm from '../pages/PromotionManagement/PromotionUpdateForm';
import { Toaster } from 'react-hot-toast';
import { FaRegUser, FaBoxesStacked } from 'react-icons/fa6';
import { FiTruck } from 'react-icons/fi';
import { MdOutlineInventory } from "react-icons/md";
import { TbDiscount2 } from "react-icons/tb";
import { LiaFilePrescriptionSolid } from "react-icons/lia";
import { GrUserWorker } from "react-icons/gr";
import { BiDollarCircle } from "react-icons/bi";
import { BsChevronDown} from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";

export default function SideBar() {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const Menus = [
    { title: "User Management", icon: <FaRegUser /> },
    { title: "Delivery Management", icon: <FiTruck /> },
    { title: "Inventory Management", icon: <MdOutlineInventory /> },
    { title: "Supplier Management", icon: <FaBoxesStacked />},
    { title: "Promotion Management", icon: <TbDiscount2 />, path: '/promotions', submenu: true,
    submenuItems: [
      { title: "Create Promotions", path: '/create-promotion'},
      { title: "Promotions Table", path: '/promotions' },
      { title: "Manage Feedbacks", path: '/feedbacks'},
    ],
  },
    { title: "Prescription Management", icon: <LiaFilePrescriptionSolid /> },
    { title: "Employee Management", icon: <GrUserWorker /> },
    { title: "Payment Management", icon: <BiDollarCircle /> },
  ];

  return (
    <div className='flex'>
      <Toaster />
      <div className='bg-dark-blue min-h-screen p-5 pt-8 min-w-max'>
        <img src={logo} alt="logo" className='mx-auto' />
        <ul className='pt-10'>
          {Menus.map((menu, index) =>(
            <React.Fragment key={index}>
            <li className={`text-white text-sm flex items-center gap-x-6 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.spacing ? "mt-9" : "mt-2"}`}>
              <span className='text-2xl block float-left'>{menu.icon ? menu.icon : <RiDashboardFill />}</span>
              <Link to={menu.path} className='text-base font-medium flex-1'>{menu.title}</Link>
              {menu.submenu && (
                <BsChevronDown className={`${subMenuOpen && "rotate-180"}`} onClick={() =>
                  setSubMenuOpen(!subMenuOpen)}/>
              )}
            </li>
            {menu.submenu && subMenuOpen && (
              <ul>
                {menu.submenuItems.map((submenuItem, index) => (
                  <li key={index} className='text-paleblue text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md'>
                    <Link to={submenuItem.path} className='flex-1'>{submenuItem.title}</Link>
                  </li>
                ))}
              </ul>
            )}
            </React.Fragment>
          ))}
        </ul>
      </div>
      <div className='w-full'>
        <Routes>
          <Route path='/promotions' element={<PromotionManagement />} />
          <Route path='/create-promotion' element={<PromotionCreateForm />} />
          <Route path='/update-promotion/:id' element={<PromotionUpdateForm />} />
        </Routes>
      </div>
    </div>
  )
}