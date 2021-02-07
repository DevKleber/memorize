<?php

namespace App\Http\Controllers;

use Helpers;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $category = \App\Category::where('id_usuario', auth('api')->user()->id)->where('bo_ativo', true)->get();
        if (!$category) {
            return response(['response' => 'Não existe Category'], 400);
        }

        return response(['dados' => $category]);
    }

    public function store(Request $request)
    {
        $request['id_usuario'] = auth('api')->user()->id;
        $category = \App\Category::create($request->all());
        if (!$category) {
            return  response(['response' => 'Erro ao salvar Category'], 400);
        }

        return response(['response' => 'Salvo com sucesso', 'dados' => $category]);
    }

    public function show($id)
    {
        $category = \App\Category::find($id);
        if ($category->id_usuario != auth('api')->user()->id) {
            return response(['response' => 'Sem permissão'], 400);
        }
        if (!$category) {
            return response(['response' => 'Não existe Category'], 400);
        }

        return response($category);
    }

    public function update(Request $request, $id)
    {
        $category = \App\Category::find($id);
        if ($category->id_usuario != auth('api')->user()->id) {
            return response(['response' => 'Sem permissão'], 400);
        }

        if (!$category) {
            return response(['response' => 'Category Não encontrado'], 400);
        }
        $category = Helpers::processarColunasUpdate($category, $request->all());

        if (!$category->update()) {
            return response(['response' => 'Erro ao alterar'], 400);
        }

        return response(['response' => 'Atualizado com sucesso']);
    }

    public function destroy($id)
    {
        $category = \App\Category::find($id);
        if ($category->id_usuario != auth('api')->user()->id) {
            return response(['response' => 'Sem permissão'], 400);
        }

        if (!$category) {
            return response(['response' => 'Category Não encontrado'], 400);
        }
        $category->bo_ativo = false;
        if (!$category->save()) {
            return response(['response' => 'Erro ao deletar Category'], 400);
        }

        return response(['response' => 'Category Inativado com sucesso']);
    }
}
