async function getResponse(path: string): Promise<string> {
  const url = "/api";
  try {
    const response = await fetch(url + path);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.text();
  } catch (error: any) {
    console.error(error.message);
    return "";
  }
}

async function postResponse(path: string, obj: any): Promise<string> {
  const url = "/api";
  try {
    const response = await fetch(url + path, {
      method: "POST",
      body: JSON.stringify(obj)
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.text();
  } catch (error: any) {
    console.error(error.message);
    return "";
  }
}

export async function seeHealthCheck(): Promise<void> {
  console.log(await getResponse("/health"));
}

export async function getAllProjects(): Promise<Array<TimeTrackRecord>> {
  const vals = await getResponse("/projects");
  return JSON.parse(vals);
}

export async function lorem(): Promise<Array<TimeTrackRecord>> {
  const vals = await postResponse("/users", {});
  return JSON.parse(vals);
}
