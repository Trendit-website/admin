import GlobalActivities from "./globalActivities";
import LiveActivities from "./liveActivities";

const Activities = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <LiveActivities />
      <GlobalActivities />
    </div>
  );
};
export default Activities;
