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
      headers: {
        "Content-Type": 'application/json'
      },
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

async function patchResponse(path: string, obj: object): Promise<string> {
  const url = "/api";
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
  } catch (error: any) {
    console.error(error.message);
    return "";
  }
}

export async function seeHealthCheck(): Promise<void> {
  console.log(await getResponse("/health"));
}

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
