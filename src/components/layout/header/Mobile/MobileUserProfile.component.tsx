interface MobileUserProfileProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  }
  onClose: () => void;
}

export const MobileUserProfile: React.FC<MobileUserProfileProps> = ({ user }) => {
  return (
    <div className="flex items-center space-x-4 p-4 border-t">
      <img 
        src={user.avatar} 
        alt={user.name} 
        className="h-10 w-10 rounded-full"
      />
      <div>
        <p className="font-medium">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    </div>
  );
};
