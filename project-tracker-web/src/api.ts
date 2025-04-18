const url = "/api";
//#region HTTP Calls
async function getResponse(path: string): Promise<string> {
  try {
    const response = await fetch(url + path);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
    return "";
  }
}

async function postResponse(path: string, obj: object): Promise<string> {
  try {
    const response = await fetch(url + path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
    return "";
  }
}

async function patchResponse(path: string, obj: object): Promise<string> {
  try {
    const response = await fetch(url + path, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
    return "";
  }
}

async function deleteResponse(path: string): Promise<string> {
  try {
    const response = await fetch(url + path, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
    return "";
  }
}
//#endregion

export async function seeHealthCheck(): Promise<void> {
  console.log(await getResponse("/health"));
}

//#region Types
export async function getAllTypes(): Promise<Array<ProjectType>> {
  const vals = await getResponse("/types");
  return JSON.parse(vals);
}

export async function addType(type: ProjectType): Promise<void> {
  await postResponse("/types", type);
}

export async function updateType(type: ProjectType): Promise<void> {
  await patchResponse("/types", type);
}

export async function deleteType(type: ProjectType): Promise<void> {
  await postResponse("/types/delete", type);
}
//#endregion 
//#region Sessions
export async function getAllProjectNames(): Promise<Array<{id: number, projectTitle: string}>> {
  const vals = await getResponse("/projects/names");
  return JSON.parse(vals);
}

export async function getAllProjects(): Promise<Array<Project>> {
  const vals = await getResponse("/projects");
  return JSON.parse(vals);
}

export async function getSessions(id: number): Promise<Array<Session>> {
  const vals = await getResponse("/sessions?id=" + id);
  return JSON.parse(vals);
}

export async function submitSession(session: Session): Promise<void> {
  await postResponse("/sessions", session);
}

export async function deleteSession(session: Session): Promise<void> {
  await deleteResponse("/sessions?id=" + session.id);
}
//#endregion
//#region Markdown
export async function getAllDocuments(): Promise<Array<string>> {
  const vals = await getResponse("/documents");
  return JSON.parse(vals);
}

export async function getProjectDocs(s: string): Promise<Array<string>> {
  const vals = await getResponse(`/documents?project=${s}`);
  return JSON.parse(vals);
}

export async function getDocument(filename: string): Promise<string> {
  return await getResponse("/doc?filename=" + filename);
}

export async function createDocument(filename: string, project: string): Promise<string> {
  return await postResponse("/doc", {filename: filename, project: project});
}


//#endregion
//#region Projects
export async function createProject(project: Project): Promise<Project> {
  const vals = await postResponse("/project", { project: project });
  return JSON.parse(vals);
}

//#endregion
