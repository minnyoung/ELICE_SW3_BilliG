import React, { Component } from 'react';
import { FaRegSmileBeam } from 'react-icons/fa';
import {
  setCurrentChatRoom,
  setPrivateChatRoom,
} from '../../../redux/actions/chatRoom_action';

import {
  child,
  getDatabase,
  ref,
  onChildAdded,
  onChildRemoved,
  off,
} from 'firebase/database';
import { chatRoomStore } from '../../../store/ChatStore';
import getUserInfo from '../getUserInfo';

export class Favorited extends Component {
  getUser = () => {
    const { user } = getUserInfo;
    return user;
  };
  getChatRoom = () => {
    // store에서 불러오기
    const {
      initialChatRoomState,
      isPrivateChatRoom,
      setCurrentChatRoom,
      setPrivateChatRoom,
      setUserPosts,
    } = chatRoomStore();
  };

  state = {
    favoritedChatRooms: [],
    activeChatRoomId: '',
    userRef: ref(getDatabase(), 'users'),
  };

  componentDidMount() {
    if (this.props.user) {
      this.addListeners(this.props.user.uid);
    }
  }

  componentWillUnmount() {
    if (this.props.user) {
      this.removeListener(this.props.user.uid);
    }
  }

  removeListener = (userId) => {
    const { userRef } = this.state;
    off(child(userRef, `${userId}/favoried`));
  };

  addListeners = (userId) => {
    const { userRef } = this.state;

    onChildAdded(child(userRef, `${userId}/favorited`), (DataSnapshot) => {
      /**클릭한 방에 대한 정보는 DataSnapshot에 들어있다. */
      const favoritedChatRoom = {
        id: DataSnapshot.key,
        ...DataSnapshot.val(),
      };
      this.setState({
        favoritedChatRooms: [
          ...this.state.favoritedChatRooms,
          favoritedChatRoom,
        ],
      });
    });

    onChildRemoved(child(userRef, `${userId}/favorited`), (DataSnapshot) => {
      const chatRoomToRemove = { id: DataSnapshot.key, ...DataSnapshot.val() };
      const filteredChatRooms = this.state.favoritedChatRooms.filter(
        (chatRoom) => {
          return chatRoom.id !== chatRoomToRemove.id;
        },
      );
      this.setState({ favoritedChatRooms: filteredChatRooms });
    });
  };

  changeChatRoom = (room) => {
    this.props.dispatch(setCurrentChatRoom(room));
    this.props.dispatch(setPrivateChatRoom(false));
    this.setState({ activeChatRoomId: room.id });
  };

  renderFavoritedChatRooms = (favoritedChatRooms) =>
    favoritedChatRooms.length > 0 &&
    favoritedChatRooms.map((chatRoom) => (
      <li
        key={chatRoom.id}
        onClick={() => this.changeChatRoom(chatRoom)}
        style={{
          backgroundColor:
            chatRoom.id === this.state.activeChatRoomId && '#ffffff45',
        }}
      >
        # {chatRoom.name}
      </li>
    ));

  render() {
    const { favoritedChatRooms } = this.state;
    return (
      <div>
        <span className="flex items-center">
          <FaRegSmileBeam className="mr-3" />
          FAVORITED ({favoritedChatRooms.length})
        </span>
        <ul className="list-none p-0">
          {this.renderFavoritedChatRooms(favoritedChatRooms)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(Favorited);