import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
export enum AdminSection {
  USERLIST,
  USERDETAIL,
  REPORT,
  POST,
  NOTICE,
  RENTAL,
  HASHTAG,
  CATEGORY,
}
interface AdminPageState {
  section: AdminSection;
  selectedUserId: string;
  showUserList: () => void;
  showUserDetail: () => void;
  showReport: () => void;
  showNotice: () => void;
  showPost: () => void;
  showRental: () => void;
  showHashTag: () => void;
  showCategory: () => void;
  setSelectedUserId: (id: string) => void;
}
/*devtools, persist 새로고침으로 상태 초기화 방지 */
const useAdminPageStore = create<AdminPageState>()(
  devtools(
    persist((set) => ({
      section: AdminSection.USERLIST,
      selectedUserId: '',
      showUserList: () => set({ section: AdminSection.USERLIST }),
      showUserDetail: () => set({ section: AdminSection.USERDETAIL }),
      showReport: () => set({ section: AdminSection.REPORT }),
      showNotice: () => set({ section: AdminSection.NOTICE }),
      showPost: () => set({ section: AdminSection.POST }),
      showRental: () => set({ section: AdminSection.RENTAL }),
      showHashTag: () => set({ section: AdminSection.HASHTAG }),
      showCategory: () => set({ section: AdminSection.CATEGORY }),
      setSelectedUserId: (id) =>
        set({ selectedUserId: id, section: AdminSection.USERDETAIL }),
    })),
  ),
);

interface NoticePageState {
  isWriting: boolean;
  onIsWriting: () => void;
  offIsWriting: () => void;
}
export const useNoticePageStore = create<NoticePageState>((set) => ({
  isWriting: true,
  onIsWriting: () => set({ isWriting: true }),
  offIsWriting: () => set({ isWriting: false }),
}));

export default useAdminPageStore;
