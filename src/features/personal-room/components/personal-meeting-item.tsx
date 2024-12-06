interface IPersonalMeetingItemProps {
  title: string;
  value: string;
}

const PersonalMeetingItem = ({ title, value }: IPersonalMeetingItemProps) => {
  return (
    <div className="flex flex-col gap-2 xl:flex-row">
      <h5 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}
      </h5>
      <p className="text-sm font-bold truncate max-sm:max-w-[320px] lg:text-xl">
        {value}
      </p>
    </div>
  );
};

export default PersonalMeetingItem;
