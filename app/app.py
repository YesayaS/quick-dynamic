"""
Application stub
"""
import os
from natsort import natsorted


def initialize():
    # perform heavy stuff here
    return True


def create_folder():
    DUMMY_PATH = "G:\_dummyFolders"
    folders = [
        0,
        1,
        3,
        2,
        4,
        "karage",
        "col 0",
        "col 3",
        "col 2",
        "col 4",
        "col 5",
        "col 6",
        "col 7",
    ]
    try:
        for folder in folders:
            folder_path = os.path.join(DUMMY_PATH, str(folder))
            if not os.path.exists(folder_path):
                os.mkdir(folder_path)
    except:
        return "error"
    return "ok"


def rename_folder(request):
    # is_folder_created = create_folder()
    # if is_folder_created == "error":
    #     return "error create_folder"

    directory_path = request.json["directoryPath"]
    rename_format = request.json["nameFormat"]

    try:
        subdirectory_folders = [
            folder
            for folder in os.listdir(directory_path)
            if os.path.isdir(os.path.join(directory_path, folder))
        ]

        init_folders = [
            rename_format.replace("{id}", str(suffix))
            for suffix in range(len(subdirectory_folders))
        ]

        set_subdirectory_folders = set(subdirectory_folders)
        set_init_folders = set(init_folders)

        true_format = list(set_subdirectory_folders.intersection(set_init_folders))
        true_format = natsorted(true_format)

        false_format = [
            item for item in set_subdirectory_folders if item not in set_init_folders
        ]
        false_format = natsorted(false_format)

        folders = true_format + false_format
        for e, folder in enumerate(folders):
            if folders[e] == rename_format.replace("{id}", str(e)):
                continue
            suffix = 0
            while rename_format.replace("{id}", str(suffix)) in folders:
                suffix += 1
            folders[e] = rename_format.replace("{id}", str(suffix))
            old_folder_directory = os.path.join(directory_path, folder)
            new_folder_directory = os.path.join(
                directory_path, rename_format.replace("{id}", str(suffix))
            )
            os.rename(old_folder_directory, new_folder_directory)
    except:
        return "error rename"

    return "ok"
