import React, { useEffect, useState } from 'react';
import { IoIosChatboxes } from 'react-icons/io';
import getUserInfo from '../getUserInfo';

/** 추후 any 바꾸기! */
function UserPanel({ user }: any) {
  return (
    <div className="w-full h-full px-2">
      {/* Logo */}
      <h3 className="text-white text-2xl p-4">
        <IoIosChatboxes className="text-4xl" /> BilliG Tok
      </h3>

      <div className="flex mt-6 flex-col w-full px-6">
        <img
          // src={user && user.photoURL} // url은 추후 다시 ...
          src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F9948F536603072310A" //user.data.image
          className="w-32 h-32 rounded-full object-cover"
          alt="사용자이미지"
        />
        <div className="text-center mt-5 font-semibold text-lg">
          {user?.nickName}
        </div>
      </div>
      <hr className="mt-2 w-full h-1 border-2 border-white" />
    </div>
  );
}

export default UserPanel;
