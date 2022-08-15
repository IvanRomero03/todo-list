import deletePriority from "./deletePriority";
import getPriorityId from "./getPriorityId";

const deletePriorityCallback = async (
  idUser: number,
  priority: string,
  priorityColor: string
) => {
  const priorityId = await getPriorityId(idUser, priority, priorityColor);

  const response = await deletePriority(idUser, priorityId);
  if (response.status != 200) {
  } else {
    return response.data;
  }
};

export default deletePriorityCallback;
