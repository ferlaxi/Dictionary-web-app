const Verbs = ({defi, exa}) => {
  return (
    <ul className="list-disc marker:text-dwa-violet mt-7 md:ml-9 ml-5 flex flex-col gap-y-3">
      <li className="text-dwa-semidark md:text-[17px] pl-3 dark:text-dwa-lightgray-strong">
        {defi}
      </li>
      <div className="ml-2 text-dwa-semigray md:text-[17px]">
        {exa}
      </div>
    </ul>
  );
};

export default Verbs;
