// import { useState, useTransition } from "react";
import { useState } from "react";
import { Avatar } from "./Avatar";
import { TaskList } from "./TaskList";

export type Task = {
  id: number;
  title: string;
  assignee: string;
};

const member = {
  a: 'A',
  b: 'B',
  c: 'C',
};

const generateDummyTasks = (): Task[] => {
  return Array(10000).fill('').map((_, index) => {
    const adddedIndex = index + 1;
    return {
      id: adddedIndex,
      title: `タスク${adddedIndex}`,
      assignee: adddedIndex % 3 === 0 ? member.a : adddedIndex % 2 === 0 ? member.b : member.c,
    };
  });
};

const tasks = generateDummyTasks();

const filteringAsignee = (assignee: string) => {
  if (assignee === '') return tasks;
  return tasks.filter((task) => task.assignee === assignee);
}

export const Transition = () => {
  // const [isPending, startTransition] = useTransition();
  const [selectedAssignee, setSelectedAssignee] = useState<string>('');
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const [isShowList, setIsShowList] = useState<boolean>(false);

  const onClickAssignee = (assignee: string) => {
    setSelectedAssignee(assignee);
    // startTransition(() => {
      setTaskList(filteringAsignee(assignee));
    // });
  };

  return (
    <div>
      <p>transition</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar isSelected={selectedAssignee === member.a} onClick={onClickAssignee}>{member.a}</Avatar>
        <Avatar isSelected={selectedAssignee === member.b} onClick={onClickAssignee}>{member.b}</Avatar>
        <Avatar isSelected={selectedAssignee === member.c} onClick={onClickAssignee}>{member.c}</Avatar>
      </div>
      <br />
      <button onClick={() => onClickAssignee('')}>リセット</button>
      <br />
      <button onClick={() => setIsShowList(!isShowList)}>表示/非表示</button>
      {isShowList && <TaskList taskList={taskList} />}
    </div>
  );
};
