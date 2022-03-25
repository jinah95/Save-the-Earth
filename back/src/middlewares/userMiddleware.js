import {UserAuthService} from "../services/userService.js";
import {ProjectService} from "../services/projectService.js";
import {fieldChecking, removeFields} from "../utils/utils.js";

async function getUsers(req, res, next) {
  try {
    const userId = req.userId;

    // user 정보를 db에서 가져오기
    const user = await UserAuthService.getUserInfo({userId});

    // 해당 user의 프로젝트 목록 가져오기
    req.projects = await ProjectService.getProjects({user});

    next();
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const id = req.id;

    // project id를 이용하여 db에서 프로젝트 검색
    const project = await ProjectService.getProject({id});
    req.project = project["_doc"];

    next();
  } catch (error) {
    next(error);
  }
}

async function addUser(req, res, next) {
  try {
    const userId = req.currentUserId; //로그인한 user의 id

    const newUser = await UserAuthService.addUser({
      ...req.toPost
    });

    req.user = fieldChecking(
      newUser["_doc"],
      "id",
      "email",
      "name",
      "description",
      "permission"
    );

    next();
  } catch (error) {
    next(error);
  }
}

async function setUser(req, res, next) {
  try {
    const id = req.id;

    // project id를 이용하여 기존의 project를 가져옴
    const project = await ProjectService.getProject({ id });

    // 가져온 project의 user와 현재 로그인한 유저의 id 비교
    //
    // 현재 로그인한 유저의 id와
    const userId = req.currentUserId;

    // project 소유자의 id가 다르다면
    if (userId !== project.user.id) {
      // 에러를 throw
      const error = new Error("잘못된 접근입니다.");
      error.status = 403;
      throw error;
    }

    // 업데이트할 정보를 묶어서
    const toUpdate = fieldChecking(req.body, "title", "description", "from", "to");

    // 프로젝트 정보를 업데이트
    const updatedProject = await ProjectService.setProject({ id, toUpdate });

    req.project = updatedProject["_doc"];

    next();
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  const userId = req.currentUserId;
  const id = req.id;

  // project id를 이용해 project를 가져옴
  const project = await ProjectService.getProject({id});

  // project 소유자의 id가 다르다면
  if (userId !== project.user.id) {
    // 에러를 throw
    const error = new Error("잘못된 접근입니다.");
    error.status = 403;
    throw error;
  }

  // 에러가 발생하지 않았다면 project를 삭제
  await ProjectService.deleteProject({ id });

  next();
}

export { getUsers, getUser, setUser, deleteUser };