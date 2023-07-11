import useFetch from '../../src/hooks/useFetch';

export default function UploadImage() {
    const path = '/upload';
    const { data: recipes, isPending, error } = useFetch('/recipe/all/', 'GET');

    return (
        <form method="POST" action={new URL(path, process.env.REACT_APP_DB_HOSTNAME).href} encType="multipart/from-data">
            <div>
                <select name="id" id="recipe-id-select">
                    {recipes?.length > 0 &&
                        recipes.map((recipe, index) => {
                            return (
                                <option value={recipe.id} key={recipe.name + index}>
                                    {recipe.name}
                                </option>
                            );
                        })}
                </select>
            </div>
            <div className="upload-image">
                <label>Ladda up bild till ett recept</label>
                <input type="file" name="recipe-image" required />
            </div>
            <div>
                <input type="submit" value="Ladda upp" />
            </div>
        </form>
    );
}
