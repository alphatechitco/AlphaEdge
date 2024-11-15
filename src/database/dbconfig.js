
import { createClient } from "@supabase/supabase-js";

const projectURL=process.env.REACT_APP_SUPABASE_URL
const projectAPI= process.env.REACT_APP_SUPABASE_API_KEY;

const supabase=createClient(projectURL,projectAPI);


export default supabase


